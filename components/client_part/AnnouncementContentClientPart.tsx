"use client";
import React, { useEffect } from "react";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Lib
import type { Announcement } from '@/lib/announcements/apiFetch';

// CSS
import content from '@/styles/common/content.module.css';
import main from '@/styles/announcementDetail.module.css';

interface AnnouncementContentProps {
    announcement: Announcement;
}

export default function AnnouncementContentClientPart({ announcement }: AnnouncementContentProps) {
    return (
        <div className={`${content["main"]} ${main["main"]}`}>
            <div className={`${content["wrapper"]} ${main["detailWrapper"]}`}>
                <h1>{announcement.title}</h1>
                <div className={main["detailHeader"]}>
                    <div className={main["detailMeta"]}>
                        <span className={`${main["detailCategory"]} ${main[`category${announcement.category}`] || ''}`}>
                            {announcement.category}
                        </span>
                        <span className={main["detailDate"]}>發布日期：{announcement.date}</span>
                    </div>
                </div>
                <div className={main["detailContentContainer"]}>
                    <div className={main["detailBody"]}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {announcement.content.replace(/\\n/g, '\n')}
                        </ReactMarkdown>
                    </div>
                    <div className={main["backButtonContainer"]}>
                        <Link href="/announcement">返回公告列表</Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 