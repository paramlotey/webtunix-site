import { PrismaClient } from "@/lib/generated/prisma";
import { Metadata } from "next";

interface Params {
  params: {
    slug: string;
  };
}

const prisma = new PrismaClient()

// Dynamic metadata function
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;

  const seoInfo = await prisma.sEO.findUnique({
    where: { route: `/blogs/${slug}` },
  });

  return {
    title: seoInfo?.title || `Webtunix AI Blog | ${slug}`,
    description:
      seoInfo?.description ||
      "Read the latest articles and insights from Webtunix AI.",
    keywords: seoInfo?.keywords || "AI, Webtunix, blog, machine learning",
  };
}

export default async function SingleBlogPage({ params }: Params) {
  const { slug } = params;

  const blogPost = await prisma.blogs.findUnique({
    where: { slug },
  });

  if (!blogPost) {
    return <p>Blog post not found</p>;
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </div>
  );
}
