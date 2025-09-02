"use client"
import React from "react";
import { motion } from "framer-motion";
import { TitleProps } from "@/types";

const Title = ({ heading, gradheading, description }: TitleProps) => {
  return (
    <div className="select-none capitalize">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight capitalize"
      >
        {heading}{" "}
        <span className="gradient-text">
          {gradheading}
        </span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-4 sm:mt-6 text-[#A7AABB] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default Title;
