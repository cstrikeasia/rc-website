import crypto from 'crypto';

export interface Announcement {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
}

const EXTERNAL_API_URL = process.env.API_URL || '';
const API_SECRET = process.env.API_SECRET || '';
if (!API_SECRET && process.env.NODE_ENV === 'production') {
    console.error("ERROR: API_SECRET is not set in environment variables for production!");
}
if (!EXTERNAL_API_URL && process.env.NODE_ENV === 'production') {
    console.error("ERROR: API_URL is not set in environment variables for production!");
}
async function fetchExternalAnnouncements(): Promise<Announcement[]> {
    if (!API_SECRET || !EXTERNAL_API_URL) {
        console.error("API Secret or URL is missing.");
        return [];
    }
    try {
        const token = crypto.createHash('md5').update(API_SECRET).digest('hex');
        const response = await fetch(`${EXTERNAL_API_URL}/ann`, {
            method: 'GET',
            headers: {
                'x-api-token': token,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });
        if (!response.ok) {
            console.error(`External API fetch error: ${response.status} ${response.statusText}`);
            throw new Error(`取得外部公告失敗：${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("External API returned non-array data:", data);
            throw new Error("來自外部 API 的無效資料格式");
        }
        return data as Announcement[];
    } catch (error) {
        console.error("Error fetching external announcements:", error);
        throw error;
    }
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
    const announcements = await fetchExternalAnnouncements();
    return [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const CACHE_TIME = 5 * 60 * 1000;
const cache = new Map();

export async function getAnnouncementsByCategory(category: string): Promise<Announcement[]> {
    const cacheKey = `announcements-${category}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        return cached.data;
    }
    const allAnnouncements = await getAllAnnouncements();
    if (category === '綜合') {
        return allAnnouncements;
    }
    const data = allAnnouncements.filter(ann => ann.category === category);
    
    cache.set(cacheKey, {
        data,
        timestamp: Date.now()
    });
    return data;
}

export async function getAnnouncementById(id: string | number): Promise<Announcement | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId)) {
        return undefined;
    }
    const announcements = await fetchExternalAnnouncements();
    return announcements.find(ann => ann.id === numericId);
} 