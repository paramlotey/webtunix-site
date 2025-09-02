import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

const SITE_URL = process.env.Site_Url || "http://localhost:3000";

export async function GET() {
  try {
    const [blogs,jobs] = await Promise.all([
      prisma.blogs.findMany({
        select: {
          slug: true,
          updatedAt: true,
          thumbnailImg: true, 
        },
      }),
      prisma.vacancies.findMany({
        select:{
          id:true,
          JobTitle:true,
          Primary_Skills:true,
          Job_Description:true,
          updatedAt:true,
        }
      })
    ]);

    const staticPages = ["", "blogs", "contact", "about", "services","careers"];

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

      const jobUrls = jobs
      .map((job) => {
        return `
      <url>
        <loc>${SITE_URL}/careers/${job.JobTitle}</loc>
        <lastmod>${job.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        ${job.Job_Description}
      </url>
    `;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${staticUrls}
      ${blogUrls}
      ${jobUrls}
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
