import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { account, password } = await request.json();
    const externalApiResponse = await fetch(`${process.env.RC_API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account,
        password,
        rememberAccount: false,
        autoLogin: false,
      }),
    });
    const externalApiData = await externalApiResponse.json();
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