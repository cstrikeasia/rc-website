import { NextResponse } from 'next/server';
import crypto from 'crypto';

const EXTERNAL_API_URL = process.env.API_URL || '';
const API_SECRET = process.env.API_SECRET || '';
export async function GET() {
    try {
        const token = crypto.createHash('md5').update(API_SECRET).digest('hex');
        const response = await fetch(`${EXTERNAL_API_URL}/ann`, {
            method: 'GET',
            headers: {
                'x-api-token': token,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: '取得公告失敗' },
                { status: response.status }
            );
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("非 JSON 資料：", data);
            return NextResponse.json({ error: '無效的資料格式' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: '伺服器錯誤' },
            { status: 500 }
        );
    }
} 