import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// Lib
import { getAnnouncementById, getTagById, type Tag, type Announcement, getChannelById, type Channel } from '@/lib/announcements/apiFetch';
import { getMetaData } from '@/lib/seoHelper';
import { announcementBaseOptions } from '@/lib/announcements/metadataConfig';

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import JsonLdInjector from '@/components/JsonLd';
import AnnouncementContentClientPart from '@/components/client_part/AnnouncementContentClientPart';

function formatDiscordTimestamp(timestamp: number): string {
    try {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Taipei'
        });
    } catch (e) {
        console.error("Error formatting timestamp:", e);
        return `(時間戳: ${timestamp})`;
    }
}

async function convertDiscordMarkdown(content: string): Promise<string> {
    let convertedContent = content;
    convertedContent = convertedContent.replace(/__\*\*(.*?)\*\*__/g, '**$1**');
    convertedContent = convertedContent.replace(/<t:(\d+):.>/g, (match, timestampStr) => {
        const timestamp = parseInt(timestampStr, 10);
        return isNaN(timestamp) ? match : formatDiscordTimestamp(timestamp);
    });
    const channelMatches = Array.from(convertedContent.matchAll(/<#(\d+)>/g));
    for (let i = 0; i < channelMatches.length; i++) {
        const match = channelMatches[i];
        const channelId = match[1];
        const channelInfo: Channel | undefined = await getChannelById(channelId);
        if (channelInfo) {
            const html = `
            <a href="https://discord.com/channels/${channelInfo.guild_id}/${channelInfo.channel_id}" target="_blank" rel="noopener noreferrer" class="channel-link">
                <span class="channel-name">
                    ${channelInfo.name}
                </span>
            </a>`;
            convertedContent = convertedContent.replace(match[0], html);
        }
    }
    return convertedContent;
}

function applyTagStyling(content: string, tagInfo: Tag): string {
    if (!tagInfo) return content;
    const tagMentionRegex = new RegExp(`(\\|\\|\\s*)?(@everyone|<@&${tagInfo.tag_id}>)(\\s*\\|\\|)?`, 'g');
    return content.replace(tagMentionRegex, () => {
        return `<div><p class="tag-name" style="background: ${tagInfo.bg_color};color: ${tagInfo.text_color};">@${tagInfo.name}</p></div>`;
    });
}

async function getTag(content: string): Promise<Tag | undefined> {
    let tagInfo: Tag | undefined = undefined;
    const mentions = content.match(/@everyone|<@&(\d+)>/g);
    if (mentions && mentions.length > 0) {
        const firstMention = mentions[0];
        if (firstMention === '@everyone') {
            tagInfo = {
                tag_id: '@everyone',
                name: 'everyone',
                text_color: '#394cb1',
                bg_color: 'rgb(113 133 255 / 30%)'
            };
        } else {
            const roleMentionMatch = /<@&(\d+)>/.exec(firstMention);
            if (roleMentionMatch && roleMentionMatch[1]) {
                const roleIdString = roleMentionMatch[1];
                const tagData = await getTagById(roleIdString);
                if (tagData) {
                    tagInfo = tagData;
                }
            }
        }
    }
    return tagInfo;
}

type Props = {
    params: {
        categorySlug: string;
        id: string;
    };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;
    const categorySlug = params.categorySlug;
    const announcement = await getAnnouncementById(id);
    const currentUrl = `${announcementBaseOptions.baseUrlSegment}/${categorySlug}/${id}`;
    if (!announcement) {
        const { metadata } = getMetaData({
            title: `找不到公告 - ${announcementBaseOptions.baseTitleSuffix}`,
            description: '您所查看的RC語音公告不存在或已被移除，請返回列表查看最新公告。',
            keywords: announcementBaseOptions.keywords,
            url: currentUrl,
            pageType: 'WebPage',
        });
        return metadata;
    }
    const announcementDescription = `閱讀RC語音官方公告：「${announcement.title}」。${announcementBaseOptions.description}`;
    const pageMetaOptions = {
        title: `${announcement.title} - ${announcementBaseOptions.baseTitleSuffix}`,
        description: announcementDescription,
        keywords: announcementBaseOptions.keywords,
        url: currentUrl,
        pageType: 'Article' as const,
    };

    const { metadata } = getMetaData(pageMetaOptions);
    return metadata;
}

export default async function AnnouncementDetailPage({ params }: Props) {
    let announcement = await getAnnouncementById(params.id);
    if (!announcement) {
        return notFound();
    }
    let processedContent = await convertDiscordMarkdown(announcement.content);
    const foundTagInfo = await getTag(announcement.content);
    if (foundTagInfo) {
        processedContent = applyTagStyling(processedContent, foundTagInfo);
    }
    const processedAnnouncement: Announcement = {
        ...announcement,
        content: processedContent,
    };
    const categorySlug = params.categorySlug;
    const id = params.id;
    const currentUrl = `${announcementBaseOptions.baseUrlSegment}/${categorySlug}/${id}`;
    const announcementDescription = `閱讀 RC 語音官方公告：「${announcement.title}」。${announcementBaseOptions.description}`;
    const pageMetaOptionsForJsonLd = {
        title: `${announcement.title} - ${announcementBaseOptions.baseTitleSuffix}`,
        description: announcementDescription,
        keywords: announcementBaseOptions.keywords,
        url: currentUrl,
        pageType: 'Article' as const,
    };
    const { jsonLd } = getMetaData(pageMetaOptionsForJsonLd);
    return (
        <>
            <Header />
            <AnnouncementContentClientPart announcement={processedAnnouncement} />
            <JsonLdInjector jsonLd={jsonLd} />
            <Footer />
        </>
    );
}