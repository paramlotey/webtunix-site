"use client"
import React from "react";
import { motion } from "framer-motion";
import { TitleProps } from "@/types";

const Title = ({heading,gradheading,description}:TitleProps) => {
  return (
    <div className="select-none">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight "
      >
        {heading}{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent transition-all duration-500">
          {gradheading}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-4 sm:mt-6 text-[#A7AABB] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
      >{description}
      </motion.p>
    </div>
  );
};

export default Title;