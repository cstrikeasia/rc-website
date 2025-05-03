import { NextResponse } from 'next/server';
import { getAllAnnouncements } from '@/lib/data/announcements';

export async function GET(request: Request) {
    try {
        const data = await getAllAnnouncements();


        return NextResponse.json(data);

    } catch (error) {
        console.error("Error in /api/announcement route:", error);
        const status = error instanceof Error && error.message.includes("取得公告失敗") ? 502 : 500;
        return NextResponse.json(
            { error: '無法取得公告資料' },
            { status: status }
        );
    }
} 