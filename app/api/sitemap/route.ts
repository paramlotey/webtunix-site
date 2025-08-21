import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ use singleton


const SITE_URL = process.env.Site_Url || "http://localhost:3000"; // your domain

export async function GET() {
  try {
    // Fetch all blogs with last updated date and image
    const blogs = await prisma.blogs.findMany({
      select: {
        slug: true,
        updatedAt: true,
        thumbnailImg: true, // make sure this field exists
      },
    });

    // Static pages
    const staticPages = ["", "blogs", "contact", "about", "services"];

    // Generate XML URLs for static pages
    const staticUrls = staticPages
      .map(
        (page) => `
      <url>
        <loc>${SITE_URL}/${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("");

    // Generate XML URLs for blogs, including images if available
    const blogUrls = blogs
      .map((blog) => {
        const imageTag = blog.thumbnailImg
          ? `<image:image>
               <image:loc>${blog.thumbnailImg}</image:loc>
               <image:caption>${blog.slug}</image:caption>
             </image:image>`
          : "";

        return `
      <url>
        <loc>${SITE_URL}/blogs/${blog.slug}</loc>
        <lastmod>${blog.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        ${imageTag}
      </url>
    `;
      })
      .join("");

    // Full sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${staticUrls}
      ${blogUrls}
    </urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}