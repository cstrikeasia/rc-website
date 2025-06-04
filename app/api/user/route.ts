import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!userId || !token) {
      return NextResponse.json({ error: { message: '缺少 userId 或 token' } }, { status: 400 });
    }
    const externalApiResponse = await fetch(`${process.env.RC_API_URL}refresh/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });
    const externalApiData = await externalApiResponse.json();
    console.log('externalApiData',externalApiData);
    if (externalApiResponse.ok) {
      return NextResponse.json(externalApiData, { status: externalApiResponse.status });
    } else {
      return NextResponse.json(externalApiData, { status: externalApiResponse.status });
    }
  } catch (error: any) {
    console.error('發生錯誤:', error);
    return NextResponse.json({ error: { message: '發生錯誤' } }, { status: 500 });
  }
} 