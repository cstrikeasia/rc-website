import { NextResponse } from 'next/server';
import { getTagById, type Tag } from '@/lib/announcements/apiFetch';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
        return NextResponse.json({ error: '缺少標籤 ID (id) 參數' }, { status: 400 });
    }
    const id = parseInt(idParam, 10);
    if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: '無效的標籤 ID' }, { status: 400 });
    }
    try {
        const tag: Tag | undefined = await getTagById(id.toString());

        if (!tag) {
            return NextResponse.json({ error: `找不到 ID 為 ${id} 的標籤` }, { status: 404 });
        }
        return NextResponse.json(tag);
    } catch (error) {
        console.error(`Error in /api/tag route for ID ${id}:`, error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: '無法取得標籤資料' },
            { status: 500 }
        );
    }
} 