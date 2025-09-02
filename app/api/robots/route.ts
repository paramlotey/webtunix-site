import { NextResponse } from "next/server";

const SITE_URL = process.env.Site_Url || "http://localhost:3000";

export async function GET() {
  try {
    const robotsTxt = `Sitemap: ${SITE_URL}/sitemap.xml

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /drafts/
Disallow: /_next/
Disallow: /static/

User-agent: Googlebot
Allow: /about/
Allow: /contact/
Allow: /careers/
Allow: /blogs/
Allow: /services/
`;

    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Failed to generate robots.txt:", error);
    return new NextResponse("Failed to generate robots.txt", { status: 500 });
  }
}
