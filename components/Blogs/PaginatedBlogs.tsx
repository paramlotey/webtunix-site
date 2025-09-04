"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Props } from "@/types";
import FiltersSidebar from "./FiltersSidebar";
import BlogCard from "./BlogCard";
import PaginationControls from "./PaginationControls";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

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
  const pathname = usePathname();

  const [search, setSearch] = useState(current.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    current.category.length > 0 ? current.category[0] : "all"
  );
  const [sort, setSort] = useState(current.sort);

  useEffect(() => {
    setSearch(current.search || "");
    setSelectedCategory(
      current.category.length > 0 ? current.category[0] : "all"
    );
    setSort(current.sort);
  }, [current.search, current.category, current.sort]);

  const buildQuery = (
    overrides: Partial<{
      page: number;
      search: string;
      category: string;
      sort: string;
    }>
  ) => {
    const params = new URLSearchParams();

    const isFilterChange =
      (overrides.search !== undefined && overrides.search !== current.search) ||
      (overrides.category !== undefined &&
        overrides.category !== (current.category[0] || "all")) ||
      (overrides.sort !== undefined && overrides.sort !== current.sort);

    const newPage =
      overrides.page !== undefined ? overrides.page : isFilterChange ? 1 : page;

    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    const newSearch =
      overrides.search !== undefined ? overrides.search : current.search;
    if (newSearch && newSearch.trim()) {
      params.set("search", newSearch.trim());
    }

    const newCategory =
      overrides.category !== undefined
        ? overrides.category
        : current.category[0];
    if (newCategory && newCategory !== "all") {
      params.set("category", newCategory);
    }

    const newSort =
      overrides.sort !== undefined ? overrides.sort : current.sort;
    if (newSort && newSort !== "latest") {
      params.set("sort", newSort);
    }

    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ""}`;
  };

  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const newUrl = buildQuery({ search });
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [search, router, pathname]);

  const handleCategoryChange = (value: string) => {
    const newUrl = buildQuery({ category: value === "all" ? "" : value });
    router.push(newUrl, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    const newUrl = buildQuery({ sort: value });
    router.push(newUrl, { scroll: false });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {initialBlogs.length > 0 ? (
            initialBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">
                No blogs found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>

        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sort={sort}
          onSortChange={handleSortChange}
          onReset={handleReset}
          categories={categories}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationControls
            page={page}
            totalPages={totalPages}
            buildHref={(p) => buildQuery({ page: p })}
          />
        </div>
      )}

      {total > 0 && (
        <p className="text-center text-gray-400 text-sm mt-3">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
          {total} {total === 1 ? "result" : "results"}
        </p>
      )}
    </>
  );
}
