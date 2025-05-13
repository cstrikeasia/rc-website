import { parse } from 'node-html-parser';

export interface LinkPreviewData {
    url: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    error?: boolean;
}

export async function getLinkPreview(url: string): Promise<LinkPreviewData | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (!response.ok) {
            console.error(`Error fetching URL ${url}: ${response.status}`);
            return { url, error: true, title: url };
        }
        const html = await response.text();
        const root = parse(html);
        const getMetaTag = (name: string): string | undefined => {
            const element = root.querySelector(`meta[property="og:${name}"]`) || root.querySelector(`meta[name="${name}"]`);
            return element?.getAttribute('content') || undefined;
        };
        const title = getMetaTag('title') || root.querySelector('title')?.text || url;
        const description = getMetaTag('description');
        let imageUrl = getMetaTag('image');
        if (!imageUrl) {
            const imgElements = root.querySelectorAll('img');
            if (imgElements.length > 0) {
                let potentialImage = imgElements[0].getAttribute('src');
                if (potentialImage && !potentialImage.startsWith('data:')) {
                    try {
                        const imgUrl = new URL(potentialImage, url);
                        imageUrl = imgUrl.href;
                    } catch (e) {
                        console.error(`Error parsing image URL ${potentialImage}:`, e);
                    }
                }
            }
        }
        return {
            url,
            title,
            description,
            imageUrl,
        };
    } catch (error) {
        console.error(`Failed to fetch or parse link preview for ${url}:`, error);
        return { url, error: true, title: url };
    }
}

export function extractUrls(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls ? Array.from(new Set(urls)) : [];
} 