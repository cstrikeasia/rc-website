import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// Lib
import { getAnnouncementById } from '@/lib/announcements/apiFetch';
import { getMetaData } from '@/lib/seoHelper';
import { announcementBaseOptions } from '@/lib/announcements/metadataConfig';

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import JsonLdInjector from '@/components/JsonLd';
import AnnouncementContentClientPart from '@/components/client_part/AnnouncementContentClientPart';

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
    const announcement = await getAnnouncementById(params.id);
    if (!announcement) {
        return notFound();
    }
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
            <AnnouncementContentClientPart announcement={announcement} />
            <JsonLdInjector jsonLd={jsonLd} />
            <Footer />
        </>
    );
}