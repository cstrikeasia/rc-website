import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// Lib
import { getAnnouncementById, type Announcement } from '@/lib/announcements/apiFetch';
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

function convertDiscordMarkdown(content: string): string {
    let convertedContent = content;
    convertedContent = convertedContent.replace(/__\*\*(.*?)\*\*__/g, '**$1**');
    convertedContent = convertedContent.replace(/<t:(\d+):.>/g, (match, timestampStr) => {
        const timestamp = parseInt(timestampStr, 10);
        return isNaN(timestamp) ? match : formatDiscordTimestamp(timestamp);
    });
    const serverId = "1095489701902831616";
    convertedContent = convertedContent.replace(
        /<#(\d+)>/g,
        `<a href="https://discord.com/channels/${serverId}/$1" target="_blank" rel="noopener noreferrer">「頻道連結」</a>`
    );
    return convertedContent;
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
    const processedContent = convertDiscordMarkdown(announcement.content);
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