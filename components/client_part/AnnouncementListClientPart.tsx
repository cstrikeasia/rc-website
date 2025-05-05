"use client";
import React from "react";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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

export default function AnnouncementListClientPart({ initialAnnouncements, currentCategory }: AnnouncementListProps) {
    // Router
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            {/** 上方按鈕 **/}
            <div className={main["categoryFilters"]}>
                {categoryLinks.map((cat) => (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className={`${main["categoryButton"]} ${currentCategory === cat.name ? main["active"] : ''}`}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/** 公告列表 **/}
            <div className={main["announcementWrapper"]}>
                <ul className={main["announcementList"]}>
                    {initialAnnouncements.length > 0 ? (
                        initialAnnouncements.map((announcement) => {
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
                                    <span className={main["itemDate"]}>{announcement.date}</span>
                                </li>
                            );
                        })
                    ) : (
                        <li className={main["noResults"]}>此分類目前沒有公告。</li>
                    )}
                </ul>
            </div>

            {initialAnnouncements.length === 0 && !currentCategory && (
                <p>讀取中或目前沒有公告...</p>
            )}
        </>
    );
} 