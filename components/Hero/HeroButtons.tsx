// HeroButtons.tsx
import React from "react";
import { motion } from "framer-motion";

interface HeroButtonsProps {
  onAskNowClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAskNowClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-3 sm:gap-4 md:gap-6 justify-center flex-wrap"
    >
      <a href="#ourservices">
        <button className="relative overflow-hidden z-10 bg-black text-white border border-[#e30613] rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transition-all duration-300">
          Get Started Today
        </button>
      </a>
      <button
        className="bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transition-all duration-300"
        onClick={onAskNowClick}
      >
        Ask Now
      </button>
    </motion.div>
  );
};

export default HeroButtons;
