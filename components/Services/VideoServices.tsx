"use client";

import { Database } from "lucide-react";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { motion, Variants } from "framer-motion";

// Container variant for staggering children
const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Each card animation
const fadeUpVariants: Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 },
  },
};

const VideoServices = () => {
  const items = [
    "Text-to-Video Conversion",
    "AI Voice Integration",
    "Customizable Video Templates",
    "Realistic AI Avatars",
    "Auto Subtitles",
    "Social Media Formats",
  ];

  return (
    <section className="my-12">
      {/* Section heading */}
      <motion.div
        className="flex justify-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
          <span className="text-[#e30613]">{"\u2726"}</span> VIDEO FEATURES{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl my-6 sm:my-8 font-semibold leading-snug sm:leading-tight capitalize"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        Explore powerful features behind{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
          Every AI video
        </span>
      </motion.h2>

      {/* Features grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 min-h-[280px] sm:min-h-[320px]"
          variants={fadeUpVariants}
        >
          <div className="flex flex-col items-center text-center gap-3 flex-grow">
            <Database className="w-8 h-8 sm:w-10 sm:h-10 text-[#e30613]" />
            <h4 className="text-lg sm:text-xl font-semibold">
              AI Voice Integration
            </h4>
            <p className="text-gray-500 text-sm sm:text-base flex-grow">
              Seamlessly integrate lifelike AI-generated voiceovers
            </p>
            <Image
              src="/Video/feature-image-1.png"
              alt="AI Voice Integration"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 min-h-[280px] sm:min-h-[320px]"
          variants={fadeUpVariants}
        >
          <div className="flex flex-col items-center text-center gap-3 flex-grow">
            <Image
              src="/Video/feature-image-2.png"
              alt="Auto Subtitles"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <h4 className="text-lg sm:text-xl font-semibold">Auto Subtitles</h4>
            <p className="text-gray-500 text-sm sm:text-base flex-grow">
              Automatically generate multilingual subtitles with customizable
              styles.
            </p>
            <p className="bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base">
              <span className="border border-[#e30613] text-[#e30613] px-2 mr-1">
                A
              </span>
              AI Voice Integration
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 min-h-[280px] sm:min-h-[320px]"
          variants={fadeUpVariants}
        >
          <div className="flex flex-col items-center text-center gap-3 flex-grow">
            <Image
              src="/Video/feature-image-3.png"
              alt="Realistic AI Avatars"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <h4 className="text-lg sm:text-xl font-semibold">
              Realistic AI Avatars
            </h4>
            <p className="text-gray-500 text-sm sm:text-base flex-grow">
              Create highly realistic avatars to represent your brand in videos.
            </p>
          </div>
        </motion.div>

        {/* Card 4 with Marquees */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between border border-white/10 min-h-[280px] sm:min-h-[320px]"
          variants={fadeUpVariants}
        >
          <div className="flex flex-col items-center text-center gap-3 flex-grow">
            <Image
              src="/Video/feature-image-4.png"
              alt="Social Media Formats"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <h4 className="text-lg sm:text-xl font-semibold">
              Social Media Formats
            </h4>
            <p className="text-gray-500 text-sm sm:text-base flex-grow">
              Export videos optimized for TikTok, Instagram, YouTube, and more.
            </p>

            {/* Marquee Row 1 */}
            <Marquee
              gradient={false}
              speed={50}
              className="py-1.5 mb-3 sm:mb-4"
              pauseOnHover
              style={{scrollbarWidth:"none"}}
            >
              {items.map((item, index) => (
                <span
                  key={index}
                  className="mx-2 sm:mx-3 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base whitespace-nowrap rounded-full bg-white/5 border border-white/10"
                >
                  {item}
                </span>
              ))}
            </Marquee>

            {/* Marquee Row 2 */}
            <Marquee
              pauseOnHover
              gradient={false}
              speed={30}
              direction="right"
              className="py-1.5"
              style={{scrollbarWidth:"none"}}
            >
              {items.map((item, index) => (
                <span
                  key={index}
                  className="mx-2 sm:mx-3 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base whitespace-nowrap rounded-full bg-white/5 border border-white/10"
                >
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoServices;
