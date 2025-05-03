import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Lib  
import { getAnnouncementsByCategory } from '@/lib/data/announcements';

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AnnouncementListClient from '@/components/client_part/AnnouncementListClient';

// CSS
import commonContent from "@/styles/common/content.module.css";
import mainStyles from "@/styles/announcement.module.css";

type Props = {
    params: { categorySlug: string };
};

const categorySlugMap: { [key: string]: string } = {
    'announcement': '公告',
    'update': '更新',
    'system': '系統'
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categorySlug = params.categorySlug;
    const categoryDisplayName = categorySlugMap[categorySlug.toLowerCase()];
    if (!categoryDisplayName) {
        return { title: '未知分類公告' };
    }
    return {
        title: `${categoryDisplayName} - RC語音官方公告`,
        description: `查看所有 ${categoryDisplayName} 相關的 RC語音官方公告。`,
    };
}

export default async function CategoryAnnouncementPage({ params }: Props) {
    const categorySlug = params.categorySlug;
    const categoryDisplayName = categorySlugMap[categorySlug.toLowerCase()];
    if (!categoryDisplayName) {
        console.warn(`類別標題無效: ${categorySlug}`);
        notFound();
    }
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
            <Footer />
        </>
    );
}