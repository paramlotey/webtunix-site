"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Blog = {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string | Date;
  category: string[] | null;
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

type Props = {
  initialBlogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  current: {
    category: string[];
    search: string;
    sort: "latest" | "oldest" | "popular";
  };
  categories: string[];
};

export default function PaginatedBlogsClient(props: Props) {
  const { initialBlogs, total, page, limit, totalPages, current, categories } =
    props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(current.search || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    current.category[0] ?? "all"
  );
  const [sort, setSort] = useState(current.sort);

  useEffect(() => {
    setSearch(current.search || "");
    setSelectedCategory(current.category[0] ?? "all");
    setSort(current.sort);
  }, [current.search, current.sort, current.category]);

  const buildQuery = (
    overrides: Record<string, string | number | undefined>
  ) => {
    const sp = new URLSearchParams(searchParams?.toString() || "");

    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined || v === "" || v === "all") {
        sp.delete(k);
      } else {
        sp.set(k, String(v));
      }
    });

    if (
      (overrides.category !== undefined &&
        overrides.category !== current.category[0]) ||
      (overrides.search !== undefined && overrides.search !== current.search) ||
      (overrides.sort !== undefined && overrides.sort !== current.sort)
    ) {
      sp.set("page", "1");
    }

    return `${pathname}?${sp.toString()}`;
  };

  const debounced = useRef<number | null>(null);
  useEffect(() => {
    if (debounced.current) window.clearTimeout(debounced.current);
    debounced.current = window.setTimeout(() => {
      router.push(buildQuery({ search }));
      router.refresh(); // force server re-fetch
    }, 400);
    return () => {
      if (debounced.current) window.clearTimeout(debounced.current);
    };
  }, [search]);

  const onCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const categoryQS = value === "all" ? undefined : value;
    router.push(buildQuery({ category: categoryQS }));
    router.refresh();
  };

  const onSortChange = (value: string) => {
    const v = (value as Props["current"]["sort"]) || "latest";
    setSort(v);
    router.push(buildQuery({ sort: v }));
    router.refresh();
  };

  const onReset = () => {
    setSearch("");
    setSelectedCategory("all");
    setSort("latest");
    const sp = new URLSearchParams();
    router.push(`${pathname}?${sp.toString()}`);
    router.refresh();
  };

  const pageHref = (p: number) => buildQuery({ page: p });
  const blogs = initialBlogs;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-5">
      <div className="flex-1">
        <motion.div
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
            >
              <div className="flex items-center space-x-2 mb-4 text-gray-400 text-xs sm:text-sm md:text-base select-none">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#e30613]" />
                <time>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 hover:text-[#e30613] transition-colors duration-300 cursor-pointer">
                {blog.title}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow leading-relaxed">
                {blog.description}
              </p>

              <hr className="border-gray-700 mb-4" />

              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center text-[#e30613] font-semibold text-sm sm:text-base group hover:underline"
              >
                Read More
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {page > 1 ? (
                  <PaginationPrevious href={pageHref(page - 1)} />
                ) : (
                  <span className="pointer-events-none opacity-50">
                    <PaginationPrevious href="#" />
                  </span>
                )}
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
                  const active = p === page;
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={pageHref(p)}
                        isActive={active}
                        className={
                          active ? "!bg-white !text-black" : "text-white"
                        }
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (p === page - 2 || p === page + 2) {
                  return (
                    <PaginationItem key={`ellipsis-${p}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                {page < totalPages ? (
                  <PaginationNext href={pageHref(page + 1)} />
                ) : (
                  <span className="pointer-events-none opacity-50">
                    <PaginationNext href="#" />
                  </span>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
          {total}
        </p>
      </div>

      <aside className="w-full lg:w-1/4 sticky top-20 self-start">
        <ScrollArea>
          <div className="bg-[#1B1B1B33] backdrop-blur-md rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-md">
            <h2 className="text-white text-lg font-semibold border-b border-white/10 pb-2 mb-3">
              Filter Blogs
            </h2>

            {/* Search */}
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="search">
                Search
              </label>
              <Input
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search..."
                className="bg-[#00000033] text-white placeholder-gray-500"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="category">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="bg-[#00000033] text-white w-3/4 capitalize">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="h-80 overflow-auto capitalize">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="sort">
                Sort By
              </label>
              <Select value={sort} onValueChange={onSortChange}>
                <SelectTrigger className="bg-[#00000033] text-white">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onReset}
              className="bg-[#e30613] hover:bg-[#ff1c2a] text-white font-semibold transition-colors duration-200"
            >
              Reset Filters
            </Button>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
