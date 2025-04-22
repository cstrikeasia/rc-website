
// IMAGE
import logo from "@/images/logo.png";

interface MetaOptions {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    image?: string;
}

export function getMetaData(meta: MetaOptions) {
    const siteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${meta.url || ""}`;
    const imageUrl = meta.image || logo.src;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: siteUrl,
        name: `RiceCall - ${meta.title}`,
        description: meta.description,
        image: imageUrl,
    };

    return {
        title: `RiceCall - ${meta.title}`,
        description: meta.description,
        keywords: meta.keywords || "RiceCall, RC語音, 語音群組, 米飯語音",
        openGraph: {
            title: `RiceCall - ${meta.title}`,
            description: meta.description,
            url: siteUrl,
            type: "website",
            images: [imageUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: `RiceCall - ${meta.title}`,
            description: meta.description,
        },
        jsonLd,
    };
}
