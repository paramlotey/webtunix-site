import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import HeroBackground from "@/components/Hero/HeroBackground";
import Title from "@/components/Extra/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PaginatedBlogsClient from "@/components/Blogs/PaginatedBlogs";
import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";
import { PageProps } from "@/types";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {

  const seoInfo = await prisma.sEO.findUnique({
    where:{route:"/blogs"}
  })
  
  return {
    title: seoInfo?.title,
    description: seoInfo?.description,
    keywords: seoInfo?.keywords
  };
}

const Blogs = async ({ searchParams }: PageProps) => {
  noStore();
  const params = (await searchParams) ?? {};
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limitRaw = Math.max(1, parseInt(params.limit || "9", 10));
  const limit = Math.min(100, limitRaw);

  const categoryParam = (params.category || "").trim();
  const categories = categoryParam
    ? categoryParam
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const search = (params.search || "").trim();
  const sort = params.sort || "latest";

  const where: NonNullable<
    Parameters<typeof prisma.blogs.findMany>[0]
  >["where"] = {};

  if (categories.length) {
    where.category =
      categories.length === 1
        ? { has: categories[0] }
        : { hasSome: categories };
  }

  if (search) {
    const contains = { contains: search, mode: "insensitive" as const };
    where.OR = [{ title: contains }, { description: contains }, { content: contains }];
  }

  const orderBy:
    | NonNullable<Parameters<typeof prisma.blogs.findMany>[0]>["orderBy"]
    | undefined = (() => {
      switch (sort) {
        case "oldest":
          return { createdAt: "asc" };
        case "popular":
          return { id: "desc" };
        case "latest":
        default:
          return { createdAt: "desc" };
      }
    })();

  const [data, total, allCategories] = await Promise.all([
    prisma.blogs.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        createdAt: true,
        category: true,
        thumbnailImg:true
      },
    }),
    prisma.blogs.count({ where }),
    prisma.category.findMany({
      select: { category_name: true },
      orderBy: { category_name: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] xl:min-h-[65vh]">
        <Navbar />
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Our"
              gradheading="Blogs"
              description="Discover insights, tutorials, and the latest trends in our comprehensive blog collection."
            />

            <div className="mt-6 mx-auto flex items-center-safe justify-center-safe">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Link href="/" className="text-base">
                      Home
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon className="-rotate-[20deg]" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Link href="/blogs" className="text-base">
                      Blogs
                    </Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-56 mb-20">
        <PaginatedBlogsClient
          key={JSON.stringify({ categories, search, sort, page, limit })}
          initialBlogs={data}
          total={total}
          page={page}
          limit={limit}
          totalPages={totalPages}
          current={{ category: categories, search, sort }}
          categories={allCategories.map((c) => c.category_name)}
        />
      </div>
    </>
  );
};

export default Blogs;