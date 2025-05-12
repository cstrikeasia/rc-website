import { NextRequest, NextResponse } from "next/server";
import { getCachedReleaseData } from "../githubCache/route";

export async function GET() {
    const cachedData = getCachedReleaseData();
    if (!cachedData) {
        return NextResponse.json({ error: "GitHub Release 資料尚未更新" }, { status: 500 });
    }

    let data = {
        "files": cachedData
    }

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        }
    });
}
