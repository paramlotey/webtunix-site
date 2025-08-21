import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import {
  Linkedin,
  Facebook,
  Twitter,
  Mail,
  Link2,
  Calendar,
  User,
  SlashIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import HeroBackground from "@/components/Hero/HeroBackground";
import Title from "@/components/Common/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBlogs from "@/components/Blogs/TopBlogs";
import NewsLetter from "@/components/Blogs/NewsLetter";
import RelatedArticles from "@/components/Blogs/RelatedArticles";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
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
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {
      title: `Webtunix AI Blog | ${slug}`,
      description: "Read the latest articles and insights from Webtunix AI.",
      keywords: "AI, Webtunix, blog, machine learning",
    };
  }
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [blogPost, relatedArticles, topBlogs] = await Promise.all([
      prisma.blogs.findUnique({
        where: { slug },
      }),
      prisma.blogs.findMany({
        where: {
          slug: {
            not: slug,
          },
          show: true,
          OR: [
            {
              category: {
                hasSome: [],
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnailImg: true,
          createdAt: true,
          authorName: true,
        },
      }),
      prisma.blogs.findMany({
        where: {
          slug: {
            not: slug,
          },
          show: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnailImg: true,
          createdAt: true,
        },
      }),
    ]);

    if (!blogPost) {
      notFound();
    }
    let finalRelatedArticles = relatedArticles;
    if (blogPost.category?.length > 0 || blogPost.tags?.length > 0) {
      try {
        finalRelatedArticles = await prisma.blogs.findMany({
          where: {
            slug: {
              not: slug,
            },
            show: true,
            OR: [
              {
                category: {
                  hasSome: blogPost.category || [],
                },
              },
              {
                tags: {
                  hasSome: blogPost.tags || [],
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 4,
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnailImg: true,
            createdAt: true,
            authorName: true,
          },
        });
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    }

    return (
      <>
        <div className="relative w-full overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] xl:min-h-[70vh]">
          <Navbar />
          <HeroBackground />
          <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
              <Title
                heading="Our"
                gradheading="Blogs"
                description="Discover insights, tutorials, and the latest trends in our comprehensive blog collection."
              />

              <div className="mt-6 mx-auto flex items-center justify-center">
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
                    <BreadcrumbSeparator>
                      <SlashIcon className="-rotate-[20deg]" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <Link
                        href={`/blogs/${slug}`}
                        className="text-base capitalize"
                      >
                        {slug}
                      </Link>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                <article className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-xl shadow-lg border border-white/10 overflow-hidden">
                  <div className="p-8 pb-6">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 ">
                      {blogPost.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/70 mb-6">
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
                        <User size={16} className="text-red-400" />
                        <span className="font-medium">
                          By {blogPost.authorName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
                        <Calendar size={16} className="text-red-400" />
                        <time className="text-sm">
                          {new Date(blogPost.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between py-4 border-t border-b border-white/10">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                        >
                          <Linkedin size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                        >
                          <Facebook size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-sky-400 bg-sky-500/10 border border-sky-500/30 rounded-lg hover:bg-sky-500/20 transition-all duration-300"
                        >
                          <Twitter size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <Mail size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <Link2 size={16} />
                        </a>
                      </div>
                      <div className="text-sm text-white/70 mt-2 lg:mt-0">
                        <span className="inline-flex items-center gap-2 px-3 py-2 border border-blue-500/30 text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all duration-300">
                          <Linkedin size={16} />
                          Follow us on LinkedIn
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-8">
                    <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <Image
                        height={1000}
                        width={1000}
                        src={blogPost.thumbnailImg}
                        alt={blogPost.title}
                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-500/40"
                      />
                    </div>
                  </div>

                  <div className="p-8">
                    {blogPost.content && (
                      <div
                        className="prose prose-lg max-w-none text-white/90 leading-relaxed prose-headings:text-white prose-links:text-red-400 prose-strong:text-white prose-code:text-white prose-blockquote:text-white/80 prose-blockquote:border-red-500/30"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                      />
                    )}
                  </div>

                  <div className="px-8 pb-8">
                    <div className="flex flex-wrap items-center justify-between py-6 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                        >
                          <Linkedin size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                        >
                          <Facebook size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-sky-400 bg-sky-500/10 border border-sky-500/30 rounded-lg hover:bg-sky-500/20 transition-all duration-300"
                        >
                          <Twitter size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <Mail size={16} />
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <Link2 size={16} />
                        </a>
                      </div>
                      <div className="text-sm text-white/70 mt-2 lg:mt-0">
                        <span className="inline-flex items-center gap-2 px-3 py-2 border border-blue-500/30 text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all duration-300">
                          <Linkedin size={16} />
                          Follow us on LinkedIn
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="w-full lg:w-1/4 space-y-6 sticky top-4 self-start">
                <NewsLetter />
                <TopBlogs topBlogs={topBlogs} />
              </div>
            </div>
            {finalRelatedArticles.length > 0 && (
              <RelatedArticles finalRelatedArticles={finalRelatedArticles} />
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Database error in SingleBlogPage:", error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Service Unavailable
          </h1>
          <p className="text-xl text-white/60">
            Unable to load blog content. Please try again later.
          </p>
          <Link
            href="/blogs"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}