"use client";
import React, { useEffect } from "react";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Lib
import type { Announcement } from '@/lib/data/announcements';

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

export default function AnnouncementListClient({ initialAnnouncements, currentCategory }: AnnouncementListProps) {
    // Router
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Page
    const pageQuery = searchParams.get('page');
    const currentPage = Math.max(1, parseInt(pageQuery || '1', 10) || 1);

    const itemsPerPage = 10;

    // Total Pages  
    const totalPages = Math.ceil(initialAnnouncements.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAnnouncementsToDisplay = initialAnnouncements.slice(startIndex, endIndex);

    // Handle
    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 1, 1);
        router.push(`${pathname}?page=${newPage}`);
    };
    const handleNextPage = () => {
        const newPage = Math.min(currentPage + 1, totalPages);
        router.push(`${pathname}?page=${newPage}`);
    };

    return (
        <>
            <h2>官方公告</h2>

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
                    {currentAnnouncementsToDisplay.length > 0 ? (
                        currentAnnouncementsToDisplay.map((announcement) => {
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

            {/** 分頁 **/}
            {totalPages > 1 && initialAnnouncements.length > 0 && (
                <div className={main["paginationControls"]}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={main["pageButton"]}
                        aria-label="上一頁"
                    >
                        ◀
                    </button>
                    <span>
                        第 {currentPage} / {totalPages} 頁
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={main["pageButton"]}
                        aria-label="下一頁"
                    >
                        ▶
                    </button>
                </div>
            )}
            {initialAnnouncements.length === 0 && !currentCategory && (
                <p>讀取中或目前沒有公告...</p>
            )}
        </>
    );
} 