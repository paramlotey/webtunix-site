"use client";
import { ArrowUpRight, Layers, Palette } from "lucide-react";
import { motion, Variants } from "framer-motion";
import React from "react";
import Image from "next/image";

const cardVariants: Variants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

const iconVariants: Variants = {
  animate: {
    rotate: [0, 360, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

const AISection = () => {
  return (
    <div className="w-full bg-black py-10 flex flex-col lg:flex-row gap-6 justify-center items-stretch">
      {/* Card 1 */}
      <motion.div
        className="bg-[#0e0e0e] rounded-2xl p-6 sm:p-8 w-full lg:w-1/3 flex flex-col justify-between min-h-[330px] overflow-hidden"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <div>
          <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
            AI That Grows With You
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Whether {`you're`} just starting or scaling globally, our adaptive
            AI platform evolves with your business.
          </p>
          <ul className="mt-4 space-y-2 text-gray-500 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> Customizable Architecture.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> Learns from Your Unique
              Data.
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-end mt-6">
          <motion.button
            className="group bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transform transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More{" "}
            <ArrowUpRight
              className="bg-white text-black rounded-full p-1 group-hover:rotate-45 transition duration-300"
              size={20}
            />
          </motion.button>
          <motion.img
            src={"/Hero/bot1.png"}
            alt="Bot Left"
            className="w-14 sm:w-20 h-auto scale-[1.7]"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        className="relative bg-[#0e0e0e] rounded-2xl p-6 sm:p-8 w-full lg:w-1/3 flex flex-col justify-center items-center text-center min-h-[330px]"
        style={{
          backgroundImage: `url(/Hero/botbg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <div className="max-w-[14rem] w-full">
          <h3 className="text-white font-semibold text-xl sm:text-2xl md:text-3xl">
            Your All-In-One{" "}
            <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent">
              AI Powerhouse
            </span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            A complete, intelligent platform designed to automate tasks
          </p>
        </div>
        <motion.div
          className="absolute top-1/12 left-1/6 opacity-70"
          variants={iconVariants}
          animate="animate"
        >
          <Layers className="bg-red-300 w-8 h-8 p-2 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute top-3/4 left-4/5 opacity-70"
          variants={iconVariants}
          animate="animate"
        >
          <Palette className="bg-red-300 w-8 h-8 p-2 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        className="bg-[#0e0e0e] rounded-2xl p-6 sm:p-8 w-full lg:w-1/3 flex flex-col justify-between min-h-[330px] overflow-hidden"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <div>
          <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
            AI That Grows With You
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Whether {`you're`} just starting or scaling globally, our adaptive
            AI platform evolves with your business.
          </p>
        </div>
        <div className="flex justify-between items-end mt-6">
          <div>
            <div className="flex items-center gap-2 mt-4">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User1"
                className="w-8 h-8 rounded-full"
                height={10}
                width={10}
              />
              <Image
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="User2"
                className="w-8 h-8 rounded-full"
                height={10}
                width={10}
              />
              <Image
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="User3"
                className="w-8 h-8 rounded-full"
                height={10}
                width={10}
                
              />
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-xs">
                15k+
              </div>
            </div>
            <p className="mt-2 text-red-500 font-semibold text-sm sm:text-base">
              98% Client Retention Rate
            </p>
          </div>
          <motion.img
            src={"/Hero/bot2.png"}
            alt="Bot Right"
            className="w-14 sm:w-20 h-auto scale-[1.7] mr-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AISection;
