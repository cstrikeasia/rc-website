import { NextResponse } from "next/server";
import { getCachedRelease } from "../githubCache/route";

export async function GET() {
    const data = getCachedRelease();
    console.log(data);
    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
    });
}
