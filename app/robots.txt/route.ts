export async function GET() {
    const content = `
  User-agent: *
  Allow: /
  
  Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
    `;
    return new Response(content, {
        headers: { "Content-Type": "text/plain" },
    });
}
