import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Lib
import { getAnnouncementsByCategory } from '@/lib/announcements/apiFetch';
import { getMetaData } from '@/lib/seoHelper';
import { announcementBaseOptions } from '@/lib/announcements/metadataConfig';

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AnnouncementListClient from '@/components/client_part/AnnouncementListClientPart';
import JsonLdInjector from '@/components/JsonLd';

// CSS
import commonContent from "@/styles/common/content.module.css";
import mainStyles from "@/styles/announcement.module.css";

type Props = {
    params: { categorySlug: string };
};

const categorySlugMap: { [key: string]: string } = {
    'announcement': '公告',
    'update': '更新',
    'system': '系統',
    'event': '活動'
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categorySlug = params.categorySlug;
    const categoryDisplayName = categorySlugMap[categorySlug.toLowerCase()];
    const currentUrl = `${announcementBaseOptions.baseUrlSegment}/${categorySlug}`;
    if (!categoryDisplayName) {
        const { metadata } = getMetaData({
            title: `未知 - ${announcementBaseOptions.baseTitleSuffix}`,
            description: announcementBaseOptions.description,
            keywords: announcementBaseOptions.keywords,
            url: currentUrl,
            pageType: 'WebPage'
        });
        return metadata;
    }
    const pageMetaOptions = {
        title: `${categoryDisplayName} - ${announcementBaseOptions.baseTitleSuffix}`,
        description: announcementBaseOptions.description,
        keywords: announcementBaseOptions.keywords,
        url: currentUrl,
        pageType: 'CollectionPage' as const,
    };
    const { metadata } = getMetaData(pageMetaOptions);
    return metadata;
}

export default async function CategoryAnnouncementPage({ params }: Props) {
    const categorySlug = params.categorySlug;
    const categoryDisplayName = categorySlugMap[categorySlug.toLowerCase()];
    const currentUrl = `${announcementBaseOptions.baseUrlSegment}/${categorySlug}`;

    if (!categoryDisplayName) {
        console.warn(`類別標題無效: ${categorySlug}`);
        notFound();
    }

    const pageMetaOptionsForJsonLd = {
        title: `${categoryDisplayName} - ${announcementBaseOptions.baseTitleSuffix}`,
        description: announcementBaseOptions.description,
        keywords: announcementBaseOptions.keywords,
        url: currentUrl,
        pageType: 'CollectionPage' as const,
    };
    const { jsonLd } = getMetaData(pageMetaOptionsForJsonLd);

    const initialAnnouncements = await getAnnouncementsByCategory(categoryDisplayName);
    return (
        <>
            <Header />
            <div className={`${commonContent["main"]} ${mainStyles["main"]}`}>
                <div className={`${commonContent["wrapper"]} ${mainStyles["wrapper"]}`}>
                    <div className={`${commonContent["content"]} ${mainStyles["content"]}`}>
                        <AnnouncementListClient
                            initialAnnouncements={initialAnnouncements}
                            currentCategory={categoryDisplayName}
                        />
                    </div>
                </div>
            </div>
            <JsonLdInjector jsonLd={jsonLd} />
            <Footer />
        </>
    );
}