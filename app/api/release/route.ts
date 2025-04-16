import { NextResponse } from 'next/server';
let cacheData: { url: string; version: string; fetchedAt: number } | null = null;
export async function GET() {
    const CACHE_TTL_MS = 1000 * 60 * 30; // 設定30分鐘緩存避免429
    const now = Date.now();
    if (cacheData && now - cacheData.fetchedAt < CACHE_TTL_MS) {
        return NextResponse.json({
            url: cacheData.url,
            version: cacheData.version,
        });
    }
    try {
        const res = await fetch(
            "https://api.github.com/repos/NerdyHomeReOpen/RiceCall/releases/latest",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    "User-Agent": "RiceCall-Agent",
                },
            }
        );
        if (!res.ok) throw new Error(`Github API 請求失敗：${res.status}`);
        const data = await res.json();
        const asset = data.assets.find((item: any) =>
            item.name.endsWith(".exe")
        );
        const url = asset?.browser_download_url || null;
        const version = data.tag_name || data.name || null;

        if (url) {
            cacheData = {
                url,
                version,
                fetchedAt: now,
            };
        }
        return NextResponse.json({
            url,
            version,
        });
    } catch (err) {
        console.error("Github API 請求失敗：", err);
        return NextResponse.json({ url: null, version: null }, { status: 500 });
    }
}