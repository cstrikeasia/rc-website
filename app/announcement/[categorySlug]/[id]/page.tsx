import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Lib
import { getAnnouncementById } from '@/lib/data/announcements';

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// CSS
import detailStyles from '@/styles/announcementDetail.module.css';
import commonContent from "@/styles/common/content.module.css";

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
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
        return {
            title: '找不到公告',
        };
    }
    return {
        title: `${announcement.title} - RC語音官方公告`,
        description: announcement.content.substring(0, 150).replace(/[`*_{}[\]()#+\-.!]/g, '') + '...',
    };
}

export default async function AnnouncementDetailPage({ params }: Props) {
    const announcement = await getAnnouncementById(params.id);
    if (!announcement) {
        notFound();
    }
    return (
        <>
            <Header />
            <div className={`${commonContent["main"]} ${detailStyles["detailMain"]}`}>
                <div className={`${commonContent["wrapper"]} ${detailStyles["detailWrapper"]}`}>
                    <div className={detailStyles["detailContentContainer"]}>
                        <div className={detailStyles["detailHeader"]}>
                            <h1 className={detailStyles["detailTitle"]}>{announcement.title}</h1>
                            <div className={detailStyles["detailMeta"]}>
                                <span className={`${detailStyles["detailCategory"]} ${detailStyles[`category${announcement.category}`] || ''}`}>
                                    {announcement.category}
                                </span>
                                <span className={detailStyles["detailDate"]}>發布日期：{announcement.date}</span>
                            </div>
                        </div>
                        <div className={detailStyles["detailBody"]}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {announcement.content}
                            </ReactMarkdown>
                        </div>
                        <div className={detailStyles["backButtonContainer"]}>
                            <Link href="/announcement">返回公告列表</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}