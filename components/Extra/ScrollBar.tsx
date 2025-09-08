"use client";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";

const ScrollBar = () => {
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      controls.start({ width: `${scrolled}%` });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);
  return (
    <motion.div
      className="fixed top-0 left-0 h-1.5  bg-gradient-to-r from-[#e30613] to-[#e3061583] z-[60]"
      initial={{ width: 0 }}
      animate={controls}
      transition={{ ease: "easeOut", duration: 0.2 }}
    />
  );
};

export default ScrollBar;
