import React from "react";

interface HeroButtonsProps {
  onAskNowClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAskNowClick }) => {
  return (
    <div className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
      <a href="#ourservices">
        <button className="relative overflow-hidden z-10 bg-black text-white border border-[#e30613] rounded-full px-4 py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transition-all duration-300">
          Get Started Today
        </button>
      </a>
      <button
        className="bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-4 py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transition-all duration-300"
        onClick={onAskNowClick}
      >
        Ask Now
      </button>
    </div>
  );
};

export default HeroButtons;
