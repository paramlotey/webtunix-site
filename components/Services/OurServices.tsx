"use client";

import { Headset, Layers } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Parent container variant for staggering children
const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2, // 0.2s delay between each child
    },
  },
};

// Variants for each card/element
const fadeUpVariants: Variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 },
  },
};

const OurServices = () => {
  return (
    <section className="my-10 sm:my-16" id="ourservices">
      {/* Section Tagline */}
      <motion.div
        className="flex justify-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
          <span className="text-[#e30613]">{"\u2726"}</span> Our Services{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        className="mx-auto text-center text-2xl sm:text-3xl lg:text-5xl max-w-4xl my-6 sm:my-8 font-semibold px-4 capitalize"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        Empowering organizations with intelligent{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
          neural systems
        </span>
      </motion.h2>

      {/* Services Grid with staggered animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.webp')] bg-center bg-cover bg-no-repeat rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-white/10"
          variants={fadeUpVariants}
        >
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">
              Custom Neural Network Development
            </h4>
            <p className="text-gray-500 mb-3 text-sm sm:text-base">
              Tailored model architectures for classification, regression, prediction.
            </p>
            <ul className="space-y-1 text-sm sm:text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Built for your unique AI needs.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Optimized for speed and accuracy.
              </li>
            </ul>
          </div>
          <div className="rounded-xl mt-6 sm:mt-10 overflow-hidden relative group">
            <Image
              src="/Service/service-1.webp"
              alt="service 1"
              width={400}
              height={400}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 after:content-[''] after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-[#ffffff4d] after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:z-10 group-hover:after:h-full group-hover:after:bg-transparent group-hover:after:transition-all group-hover:after:duration-700" />
          </div>
        </motion.div>

        {/* Column with Two Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Card 2 */}
          <motion.div
            className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.webp')] bg-center bg-cover bg-no-repeat rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex-1"
            variants={fadeUpVariants}
          >
            <div className="absolute bottom-3 right-3 opacity-10">
              <Layers size={40} className="sm:w-12 sm:h-12" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Deep Learning Model</h4>
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              Using large datasets to train high-performance models.
            </p>
            <ul className="space-y-1 text-sm sm:text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Delivers high-accuracy predictions.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Learns deep data patterns.
              </li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.webp')] bg-center bg-cover bg-no-repeat rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex-1"
            variants={fadeUpVariants}
          >
            <div className="absolute bottom-3 right-3 opacity-10">
              <Layers size={40} className="sm:w-12 sm:h-12" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Strategy for AI Adoption</h4>
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              Expert guidance on implementing neural networks into business.
            </p>
            <ul className="space-y-1 text-sm sm:text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Aligns AI with your business goals.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Smart, scalable AI planning.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Card 4 */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/5 bg-[url('/Service/service-2.webp')] bg-center bg-cover bg-no-repeat flex flex-col"
          variants={fadeUpVariants}
        >
          <div className="flex-1"></div>
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-end gap-2 items-start">
            <Headset size={24} className="sm:w-9 sm:h-9 mb-2 sm:mb-3" />
            <h4 className="text-lg sm:text-xl font-semibold mb-2">
              Get in Touch with Our AI Experts
            </h4>
            <p className="text-gray-500 mb-4 sm:mb-5 text-sm sm:text-base">
              Whether {`you're`} looking to build a custom neural network, explore deep learning.
            </p>
            <Link href={'/contact-us'}>
            <button className="bg-gradient-to-r from-[#e30613] to-[#b10510] text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transform transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Us
            </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurServices;
