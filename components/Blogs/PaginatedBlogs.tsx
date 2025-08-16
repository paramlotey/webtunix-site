"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useGetCategoryQuery } from "@/redux/apis/Category";

const blogs = [
  {
    id: 1,
    date: "Aug 10, 2025",
    title: "Exploring AI in Healthcare",
    description:
      "Discover how artificial intelligence is transforming the healthcare industry.",
    href: "/blogs/ai-healthcare",
  },
  {
    id: 2,
    date: "Aug 5, 2025",
    title: "Top AI Trends in 2025",
    description:
      "Stay ahead with the latest trends and breakthroughs in AI technology.",
    href: "/blogs/ai-trends-2025",
  },
  {
    id: 3,
    date: "Jul 30, 2025",
    title: "AI Ethics and Responsibility",
    description:
      "An insightful look into ethical considerations in AI development.",
    href: "/blogs/ai-ethics",
  },
  {
    id: 4,
    date: "Aug 10, 2025",
    title: "Exploring AI in Healthcare",
    description:
      "Discover how artificial intelligence is transforming the healthcare industry.",
    href: "/blogs/ai-healthcare",
  },
  {
    id: 5,
    date: "Aug 5, 2025",
    title: "Top AI Trends in 2025",
    description:
      "Stay ahead with the latest trends and breakthroughs in AI technology.",
    href: "/blogs/ai-trends-2025",
  },
  {
    id: 6,
    date: "Jul 30, 2025",
    title: "AI Ethics and Responsibility",
    description:
      "An insightful look into ethical considerations in AI development.",
    href: "/blogs/ai-ethics",
  },
  {
    id: 7,
    date: "Aug 10, 2025",
    title: "Exploring AI in Healthcare",
    description:
      "Discover how artificial intelligence is transforming the healthcare industry.",
    href: "/blogs/ai-healthcare",
  },
  {
    id: 8,
    date: "Aug 5, 2025",
    title: "Top AI Trends in 2025",
    description:
      "Stay ahead with the latest trends and breakthroughs in AI technology.",
    href: "/blogs/ai-trends-2025",
  },
  {
    id: 9,
    date: "Jul 30, 2025",
    title: "AI Ethics and Responsibility",
    description:
      "An insightful look into ethical considerations in AI development.",
    href: "/blogs/ai-ethics",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const PaginatedBlogs = () => {
  const { data: allCategories } = useGetCategoryQuery(undefined);
  console.log(allCategories);
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
          {blogs.map(({ id, date, title, description, href }) => (
            <motion.article
              key={id}
              className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
            >
              <div className="flex items-center space-x-2 mb-4 text-gray-400 text-xs sm:text-sm md:text-base select-none">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#e30613]" />
                <time dateTime={date}>{date}</time>
              </div>

              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 hover:text-[#e30613] transition-colors duration-300 cursor-pointer">
                {title}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow leading-relaxed">
                {description}
              </p>

              <hr className="border-gray-700 mb-4" />

              <Link
                href={href}
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
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <aside className="w-full lg:w-1/4 sticky top-20 self-start">
        <ScrollArea className="">
          <div className="bg-[#1B1B1B33] backdrop-blur-md rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-md">
            <h2 className="text-white text-lg font-semibold border-b border-white/10 pb-2 mb-3">
              Filter Blogs
            </h2>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="search">
                Search
              </label>
              <Input
                id="search"
                placeholder="Type to search..."
                className="bg-[#00000033] text-white placeholder-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="category">
                Category
              </label>
              <Select>
                <SelectTrigger className="bg-[#00000033] text-white w-3/4">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="h-80 overflow-auto">
                  {allCategories?.categories.map(
                    (item: { category_name: string }, index: string) => (
                      <SelectItem value={item.category_name} key={index}>
                        {item.category_name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-2" htmlFor="sort">
                Sort By
              </label>
              <Select>
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

            <div className="flex flex-col">
              <span className="text-gray-400 text-sm mb-2">Popular Tags</span>
              <div className="flex flex-wrap gap-2">
                {["AI", "Ethics", "Healthcare", "Trends"].map((tag) => (
                  <Button
                    key={tag}
                    variant="default"
                    size="sm"
                    className="text-white border-white/20 hover:bg-[#e30613] hover:text-white transition-colors duration-200"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="bg-[#e30613] hover:bg-[#ff1c2a] text-white font-semibold transition-colors duration-200">
              Reset Filters
            </Button>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
};

export default PaginatedBlogs;
