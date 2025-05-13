"use client";
import React, { memo, useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Lib
import type { Announcement } from '@/lib/announcements/apiFetch';

// CSS
import content from "@/styles/common/content.module.css";
import main from "@/styles/announcement.module.css";

interface AnnouncementListProps {
    initialAnnouncements: Announcement[];
    currentCategory: string;
}

const categoryLinks = [
    { name: '綜合', href: '/announcement' },
    { name: '公告', href: '/announcement/announcement' },
    { name: '更新', href: '/announcement/update' },
    { name: '系統', href: '/announcement/system' },
    { name: '活動', href: '/announcement/event' },
];

const categoryDisplayNameToSlugMap: { [key: string]: string } = {
    '公告': 'announcement',
    '更新': 'update',
    '系統': 'system',
    '活動': 'event',
};

const AnnouncementListClient = memo(function AnnouncementListClient({
    initialAnnouncements,
    currentCategory
}: AnnouncementListProps) {
    // Router
    const router = useRouter();
    const pathname = usePathname();
    // State
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(currentCategory);
    const [cachedData, setCachedData] = useState<{ [key: string]: Announcement[] }>({
        [currentCategory]: initialAnnouncements
    });
    // Handles
    const handleCategoryChange = async (category: string, href: string) => {
        setActiveCategory(category);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/announcements?category=${encodeURIComponent(category)}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            setAnnouncements(data);
            setCachedData(prev => ({
                ...prev,
                [category]: data
            }));
            window.history.pushState({}, '', href);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // Effect
    useEffect(() => {
        setActiveCategory(currentCategory);
    }, [currentCategory]);

    return (
        <>
            {/** 上方按鈕 **/}
            <div className={main["categoryFilters"]}>
                {categoryLinks.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => handleCategoryChange(cat.name, cat.href)}
                        className={`${main["categoryButton"]} ${activeCategory === cat.name ? main["active"] : ''}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/** 公告列表 **/}
            <div className={main["announcementWrapper"]}>
                <ul className={main["announcementList"]}>
                    {isLoading ? (
                        <li className={main["noResults"]}>載入中...</li>
                    ) : announcements.length > 0 ? (
                        announcements.map((announcement) => {
                            const categorySlug = categoryDisplayNameToSlugMap[announcement.category] || 'unknown';
                            return (
                                <li key={`${announcement.id}-${announcement.date}`} className={main["announcementItem"]}>
                                    <Link href={`/announcement/${categorySlug}/${announcement.id}`} className={main["itemLink"]}>
                                        <div className={main["itemTitleBlock"]}>
                                            <span className={`${main["itemCategory"]} ${main[`category${announcement.category}`] || ''}`}>
                                                {announcement.category}
                                            </span>
                                            <span className={main["itemTitle"]}>{announcement.title}</span>
                                        </div>
                                    </Link>
                                    <span className={main["itemDate"]}>
                                        {new Date(announcement.date).toLocaleString('zh-TW', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                            timeZone: 'Asia/Taipei'
                                        }).replace(/\//g, '-').slice(0, 10)}
                                    </span>
                                </li>
                            );
                        })
                    ) : (
                        <li className={main["noResults"]}>此分類目前沒有公告。</li>
                    )}
                </ul>
            </div>
        </>
    );
});

export default AnnouncementListClient; 