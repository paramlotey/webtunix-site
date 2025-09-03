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
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  thumbnailImg: string;
  createdAt: string | Date;
  category: string[] | null;
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

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

// -------------------- Small Components --------------------

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.article
      variants={cardVariants}
      className="bg-[#1B1B1B33] backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col border border-white/10 shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Date */}
      <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs sm:text-sm">
        <Calendar className="w-4 h-4 text-[#e30613]" />
        <time>
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>

      {/* Thumbnail */}
      <div className="rounded-xl my-5 overflow-hidden relative group">
        <Image
          src={blog.thumbnailImg}
          alt={blog.title}
          width={400}
          height={400}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 after:content-[''] after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-[#ffffff4d] after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:z-10 group-hover:after:h-full group-hover:after:bg-transparent group-hover:after:transition-all group-hover:after:duration-700" />
      </div>

      {/* Title & Description */}
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 hover:text-[#e30613] transition-colors cursor-pointer">
        {blog.title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 flex-grow">{blog.description}</p>

      <hr className="border-gray-700 mb-4" />

      {/* Read More */}
      <Link
        href={`/blogs/${blog.slug}`}
        className="inline-flex items-center text-[#e30613] font-semibold text-sm group hover:underline"
      >
        Read More
        <ArrowRight className="ml-2 w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
      </Link>
    </motion.article>
  );
}

function FiltersSidebar({
  search,
  setSearch,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  onReset,
  categories,
}: {
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  onReset: () => void;
  categories: string[];
}) {
  return (
    <aside className="w-full lg:w-1/4 sticky top-32 self-start">
      <ScrollArea>
        <div className="bg-[#1B1B1B33] backdrop-blur-md rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-md">
          <h2 className="text-white text-lg font-semibold border-b border-white/10 pb-2">
            Filter Blogs
          </h2>

          {/* Search */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Search</label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="bg-[#00000033] text-white placeholder-gray-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-[#00000033] text-white w-full capitalize">
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

          {/* Sort */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Sort By</label>
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="bg-[#00000033] text-white w-full">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <Button
            onClick={onReset}
            className="bg-[#e30613] hover:bg-[#ff1c2a] text-white"
          >
            Reset Filters
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}

function PaginationControls({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (p: number) => string;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious href={buildHref(page - 1)} />
          ) : (
            <span className="opacity-50 pointer-events-none">
              <PaginationPrevious href="#" />
            </span>
          )}
        </PaginationItem>

        {/* Pages */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href={buildHref(p)}
                  isActive={p === page}
                  className={
                    p === page ? "!bg-white !text-black" : "text-white"
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

        {/* Next */}
        <PaginationItem>
          {page < totalPages ? (
            <PaginationNext href={buildHref(page + 1)} />
          ) : (
            <span className="opacity-50 pointer-events-none">
              <PaginationNext href="#" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// -------------------- Main Component --------------------

export default function PaginatedBlogsClient({
  initialBlogs,
  total,
  page,
  limit,
  totalPages,
  current,
  categories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(current.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    current.category[0] ?? "all"
  );
  const [sort, setSort] = useState(current.sort);

  // Update states when current changes
  useEffect(() => {
    setSearch(current.search || "");
    setSelectedCategory(current.category[0] ?? "all");
    setSort(current.sort);
  }, [current]);

  // Build query helper
  const buildQuery = (
    overrides: Record<string, string | number | undefined>
  ) => {
    const sp = new URLSearchParams(searchParams?.toString() || "");
    Object.entries(overrides).forEach(([k, v]) => {
      if (!v || v === "all") sp.delete(k);
      else sp.set(k, String(v));
    });
    if (
      overrides.category !== current.category[0] ||
      overrides.search !== current.search ||
      overrides.sort !== current.sort
    ) {
      sp.set("page", "1");
    }
    return `${pathname}?${sp.toString()}`;
  };

  // Debounced search
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      router.push(buildQuery({ search }), { scroll: false });
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Handlers
  const onCategoryChange = (v: string) =>
    router.push(buildQuery({ category: v === "all" ? undefined : v }), {
      scroll: false,
    });
  const onSortChange = (v: string) =>
    router.push(buildQuery({ sort: v }), { scroll: false });
  const onReset = () => router.push(pathname, { scroll: false });

  return (
    <>
      {/* Blogs + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {initialBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </motion.div>

        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sort={sort}
          onSortChange={onSortChange}
          onReset={onReset}
          categories={categories}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          buildHref={(p) => buildQuery({ page: p })}
        />
      </div>

      <p className="text-center text-gray-400 text-sm mt-3">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
        {total}
      </p>
    </>
  );
}
