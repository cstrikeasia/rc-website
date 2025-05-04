import type { Metadata } from 'next';

interface MetaOptions {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    image?: string;
    pageType?: 'WebSite' | 'WebPage' | 'Article' | 'CollectionPage';
}

interface MetaDataResult {
    metadata: Metadata;
    jsonLd: object;
}

export function getMetaData(meta: MetaOptions): MetaDataResult {
    const siteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${meta.url || ''}`;
    const imageUrl = meta.image || `${process.env.NEXT_PUBLIC_SITE_URL || ''}images/logo.png`;
    const metadataResult: Metadata = {
        metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
        title: `RiceCall - ${meta.title}`,
        description: meta.description,
        alternates: {
            canonical: siteUrl,
        },
        openGraph: {
            title: `RiceCall - ${meta.title}`,
            description: meta.description,
            url: siteUrl,
            siteName: 'RiceCall',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `RiceCall - ${meta.title}`,
                },
            ],
            locale: 'zh_TW',
            type: meta.pageType === 'Article' ? 'article' : 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `RiceCall - ${meta.title}`,
            description: meta.description,
            images: [imageUrl],
        },
    };
    if (meta.keywords) {
        metadataResult.keywords = meta.keywords.split(',').map(k => k.trim());
    } else {
        metadataResult.keywords = ["RiceCall", "RC語音", "語音群組", "米飯語音"];
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": meta.pageType || "WebSite",
        url: siteUrl,
        name: `RiceCall - ${meta.title}`,
        description: meta.description,
        ...((meta.pageType || "WebSite") === "WebSite" && {
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/images/logo.png`
        }),
        ...(meta.pageType === "Article" && {
            image: imageUrl,
        }),
    };
    return {
        metadata: metadataResult,
        jsonLd: jsonLd,
    };
}
