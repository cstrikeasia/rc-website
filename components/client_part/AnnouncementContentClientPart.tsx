"use client";
import React, { useEffect, memo } from "react";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Lib
import type { Announcement } from '@/lib/announcements/apiFetch';
import type { LinkPreviewData } from '@/lib/linkPreview';

// CSS
import content from '@/styles/common/content.module.css';
import main from '@/styles/announcementDetail.module.css';
import previewStyles from "@/styles/link-preview.module.css";

interface AnnouncementContentClientPartProps {
    announcement: Announcement;
    linkPreviews?: LinkPreviewData[];
}

const AnnouncementContentClientPart = memo(function AnnouncementContentClientPart({
    announcement,
    linkPreviews
}: AnnouncementContentClientPartProps) {
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

                    {linkPreviews && linkPreviews.length > 0 && (
                        <div className={previewStyles.linkPreviewsContainer}>
                            {linkPreviews.map((preview, index) => (
                                <div
                                    key={index}
                                    className={previewStyles.previewCard}
                                >
                                    <div className={previewStyles.previewContent}>
                                        <a
                                            key={index}
                                            href={preview.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`預覽：${preview.title || preview.url}`}
                                        >
                                            <h4 className={previewStyles.previewTitle}>
                                                {preview.title || preview.url}
                                            </h4>
                                        </a>
                                        {preview.description && (
                                            <p className={previewStyles.previewDescription}>
                                                {preview.description}
                                            </p>
                                        )}
                                    </div>
                                    {preview.imageUrl && (
                                        <div className={previewStyles.previewImageContainer}>
                                            <img src={preview.imageUrl} alt={preview.title || '連結圖片'} className={previewStyles.previewImage} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={main["backButtonContainer"]}>
                        <Link href="/announcement">返回公告列表</Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AnnouncementContentClientPart; 