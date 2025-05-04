import { NextResponse } from 'next/server';

export async function GET() {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    const pages = [
        { path: '', priority: '1.0' },
        { path: 'announcement', priority: '0.8' },
        { path: 'faq', priority: '0.8' },
        { path: 'specification', priority: '0.6' },
        { path: 'agreement', priority: '0.6' },
        { path: 'contactus', priority: '0.4' },
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${pages.map((page) => {
        if (page.path === 'register' || page.path === 'login') return;
        return `
            <url>
                <loc>${url}${page.path}</loc>
                <changefreq>monthly</changefreq>
                <priority>${page.priority}</priority>
            </url>
        `;
    }).join('')}
    </urlset>`;
    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
