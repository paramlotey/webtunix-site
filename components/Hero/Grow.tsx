import { ArrowUpRight, Layers, Palette } from "lucide-react";
import React from "react";

const AISection = () => {
  return (
    <div className="w-full bg-black py-10 flex flex-col md:flex-row gap-6 justify-center items-stretch">
      <div className="bg-[#0e0e0e] rounded-2xl p-6 md:w-1/3 flex flex-col justify-between min-h-[330px]  h-full overflow-hidden">
        <div>
          <h3 className="text-white font-semibold text-lg">
            AI That Grows With You
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Whether {`you're`} just starting or scaling globally, our adaptive AI
            platform evolves with your business.
          </p>
          <ul className="mt-4 space-y-2 text-gray-500 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> Customizable Architecture.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> Learns from Your Unique
              Data.
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-end">
          <button
            className="group bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium
                hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transform transition-all duration-300 flex items-center gap-2"
          >
            Learn More{" "}
            <ArrowUpRight
              className="bg-white text-black rounded-full p-1 group-hover:rotate-45 transition duration-300"
              size={30}
            />
          </button>
          <img
            src={"/Hero/bot1.png"}
            alt="Bot Left"
            className="w-20 h-auto scale-[1.7]"
          />
        </div>
      </div>

      <div
        className="relative bg-[#0e0e0e] rounded-2xl p-6 md:w-1/3 flex flex-col justify-center items-center text-center min-h-[330px]  h-full"
        style={{
          backgroundImage: `url(/Hero/botbg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-56 w-full">
          <h3 className="text-white font-semibold text-2xl">
            Your All-In-One{" "}
            <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
              AI Powerhouse
            </span>
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            A complete, intelligent platform designed to automate tasks
          </p>
        </div>
        <div className="animate-hero-icon absolute top-1/2 left-1/2 origin-center transform-3d">
            <Layers className="bg-red-300 w-10 h-10 p-2 rounded-full"/>
        </div>

          <div className="animate-hero-icon absolute top-1/2 left-1/2 origin-center transform-3d">
            <Palette className="bg-red-300 w-10 h-10 p-2 rounded-full"/>
        </div>
      </div>

      <div className="bg-[#0e0e0e] rounded-2xl p-6 md:w-1/3 flex flex-col justify-between min-h-[330px]  h-full overflow-hidden">
        <div>
          <h3 className="text-white font-semibold text-lg">
            AI That Grows With You
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Whether you're just starting or scaling globally, our adaptive AI
            platform evolves with your business.
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mt-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User1"
                className="w-8 h-8 rounded-full"
              />
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="User2"
                className="w-8 h-8 rounded-full"
              />
              <img
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="User3"
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-xs">
                15k+
              </div>
            </div>
            <p className="mt-2 text-red-500 font-semibold text-sm">
              98% Client Retention Rate
            </p>
          </div>
          <img
            src={"/Hero/bot2.png"}
            alt="Bot Right"
            className="w-20 h-auto scale-[1.7] mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AISection;
