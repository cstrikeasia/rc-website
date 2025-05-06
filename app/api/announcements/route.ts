import { NextResponse } from 'next/server';
import { getAnnouncementsByCategory } from '@/lib/announcements/apiFetch';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
        return NextResponse.json({ error: '需要提供分類參數' }, { status: 400 });
    }

    try {
        const announcements = await getAnnouncementsByCategory(category);
        return NextResponse.json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ error: '取得公告失敗' }, { status: 500 });
    }
} 