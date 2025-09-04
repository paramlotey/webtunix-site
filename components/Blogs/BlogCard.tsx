import { Blog } from "@/types";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BlogCard({ blog }: { blog: Blog }) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

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

export default BlogCard;
