export interface Announcement {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function fetchAnnouncementsFromAPI(): Promise<Announcement[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/announcement`, {
            cache: 'no-store',
        });
        if (!response.ok) {
            console.error(`API fetch error: ${response.status} ${response.statusText}`);
            throw new Error(`取得公告失敗：${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("API returned non-array data:", data);
            throw new Error("來自 API 的無效資料格式");
        }
        return data as Announcement[];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
    const announcements = await fetchAnnouncementsFromAPI();
    return [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAnnouncementsByCategory(category: string): Promise<Announcement[]> {
    const allAnnouncements = await getAllAnnouncements();
    if (category === '綜合') {
        return allAnnouncements;
    }
    return allAnnouncements.filter(ann => ann.category === category);
}

export async function getAnnouncementById(id: string | number): Promise<Announcement | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId)) {
        return undefined;
    }
    const announcements = await fetchAnnouncementsFromAPI();
    return announcements.find(ann => ann.id === numericId);
} 