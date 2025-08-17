"use client";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useGetAllBlogsQuery } from "@/redux/apis/BlogApi";
import { Blogs } from "@/lib/generated/prisma";


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
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPageBlogs = () => {
  const { data: blogs } = useGetAllBlogsQuery({ limit: 3 });

  return (
    <section className="my-16 sm:my-20 mx-auto">
      <div className="flex justify-center mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center select-none">
          <span className="text-[#e30613] mr-2">{"\u2726"}</span>
          Latest Blogs
          <span className="text-[#e30613] ml-2">{"\u2726"}</span>
        </h3>
      </div>

      <h2 className="text-center mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-10 sm:mb-14 font-semibold leading-snug sm:leading-tight">
        Your source for AI{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
          news and trends
        </span>
      </h2>

      <motion.div
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {blogs &&
          blogs.data &&
          blogs?.data.map(({ id, createdAt, title, description, slug }:Blogs) => (
            <motion.article
              key={id}
              className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10"
              variants={cardVariants}
            >
              <div className="flex items-center space-x-2 mb-4 text-gray-400 text-xs sm:text-sm md:text-base select-none">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#e30613]" />
                <time>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              {/* Blog Title */}
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 hover:text-[#e30613] transition-colors duration-300 cursor-pointer">
                {title}
              </h3>

              {/* Blog Description */}
              <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow leading-relaxed">
                {description}
              </p>

              <hr className="border-gray-700 mb-4" />

              {/* Read More Link */}
              <Link
                href={`/blogs/${slug}`}
                className="inline-flex items-center text-[#e30613] font-semibold text-sm sm:text-base group hover:underline"
              >
                Read More
                <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </Link>
            </motion.article>
          ))}
      </motion.div>
    </section>
  );
};

export default LandingPageBlogs;
