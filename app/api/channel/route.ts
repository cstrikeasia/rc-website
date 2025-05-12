import { NextResponse } from 'next/server';
import { getChannelById, type Channel } from '@/lib/announcements/apiFetch';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
        return NextResponse.json({ error: '缺少頻道 ID (id) 參數' }, { status: 400 });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: '無效的頻道 ID' }, { status: 400 });
    }
    try {
        const channel: Channel | undefined = await getChannelById(id.toString());

        if (!channel) {
            return NextResponse.json({ error: `找不到 ID 為 ${id} 的頻道` }, { status: 404 });
        }
        return NextResponse.json(channel);
    } catch (error) {
        console.error(`Error in /api/channel route for ID ${id}:`, error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: '無法取得頻道資料' },
            { status: 500 }
        );
    }
} 