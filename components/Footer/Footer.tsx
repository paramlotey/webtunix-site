import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-around items-center bg-gradient-to-r from-[#e30613] to-[#e3061583] px-10 py-10 md:py-12 md:px-16 gap-8 md:gap-0">
        
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 border-b md:border-b-0 border-white/40 md:pr-8">
          <h2 className="text-5xl font-bold border-r border-white/70 pr-6 whitespace-nowrap">
            WebTunix AI
          </h2>
          <h4 className="text-xl font-semibold text-white/90">
            Defining New Standards for AI{" "}
            <sup className="text-lg font-normal">TM</sup>
          </h4>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-6">
          <Button
            variant="outline"
            className="flex items-center gap-3 px-8 py-4 text-lg border-white bg-transparent text-white hover:bg-white/5 hover:text-white transition-colors duration-300"
          >
            Contact Us <ArrowRight size={24} />
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-3 px-8 py-4 text-lg bg-white text-[#e30613] hover:bg-white/80 transition-colors duration-300"
          >
            Subscribe <ArrowRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
