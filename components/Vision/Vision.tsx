"use client";

import { Gem, Layers, Phone, Puzzle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

// Container variant for staggered children
const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Card animation
const fadeUpVariants: Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 },
  },
};

const Vision = () => {
  const cards = [
    { icon: Layers, title: "Custom AI Solutions" },
    { icon: Gem, title: "Predictive Analytics" },
    { icon: Puzzle, title: "AI Model Training" },
  ];

  return (
    <section className="my-10 sm:my-16">
      {/* Section Tagline */}
      <motion.div
        className="flex justify-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
          <span className="text-[#e30613]">{"\u2726"}</span> Vision{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        className="mx-auto text-center text-2xl sm:text-3xl lg:text-5xl max-w-4xl my-6 sm:my-8 font-semibold leading-snug sm:leading-tight px-4"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        Transforming your vision with{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
          advanced AI services
        </span>
      </motion.h2>

      {/* Vision Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* AI Cards */}
        {cards.map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 min-h-[380px] overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-[linear-gradient(to_right,#e30613,#e3061583)] before:rounded-t-[999px] before:rounded-b-[16px] before:z-0 before:origin-bottom before:transition-all before:duration-700 before:ease-in-out hover:before:h-full hover:before:rounded-t-[16px] hover:before:rounded-b-[16px]"
            variants={fadeUpVariants}
          >
            <div className="relative z-10 flex flex-col justify-between flex-grow">
              <item.icon className="w-10 h-10 sm:w-14 sm:h-14 mb-4" />
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm sm:text-base">
                  Custom AI solutions tailored to meet your unique business
                  needs, leveraging cutting-edge neural technologies.
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact Card */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-6 sm:p-8 border border-white/10 min-h-[380px] relative flex flex-col justify-between overflow-hidden"
          variants={fadeUpVariants}
        >
          <div>
            <p className="text-gray-500 text-sm sm:text-base">Need Any Help!</p>
            <p className="text-base sm:text-lg flex items-center gap-2 mt-1">
              <Phone className="w-5 h-5" /> +1234567890
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[250px]">
            <Image
              src={"/Vision/vission.png"}
              alt="vision"
              height={250}
              width={250}
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Vision;
