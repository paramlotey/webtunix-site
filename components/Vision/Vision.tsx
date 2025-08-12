import { Gem, Layers, Phone, Puzzle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Vision = () => {
  return (
    <section className="my-12">
      <div className="flex justify-center">
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
          <span className="text-[#e30613]">{"\u2726"}</span> VISION{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </div>

      <h2 className="mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl my-6 sm:my-8 font-semibold leading-snug sm:leading-tight">
        Transforming your vision with{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
          advanced AI services
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-10">
        <div className="relative bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 min-h-[420px]  mx-auto before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-[linear-gradient(to_right,#e30613,#e3061583)] before:rounded-t-[999px] before:rounded-b-[16px] before:z-0 before:origin-bottom before:transition-all before:duration-700 before:ease-in-out hover:before:h-full hover:before:rounded-t-[16px] hover:before:rounded-b-[16px] overflow-hidden">
          <div className="relative z-10 flex flex-col justify-between flex-grow">
            <Layers className="w-10 h-10 sm:w-14 sm:h-14" />
            <div>
              <h4 className="text-lg sm:text-xl font-semibold">
                Custom AI Solutions
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">
                Custom AI Solutions tailored to meet your unique business needs,
                leveraging.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 min-h-[420px]  mx-auto before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-[linear-gradient(to_right,#e30613,#e3061583)] before:rounded-t-[999px] before:rounded-b-[16px] before:z-0 before:origin-bottom before:transition-all before:duration-700 before:ease-in-out hover:before:h-full hover:before:rounded-t-[16px] hover:before:rounded-b-[16px] overflow-hidden">
          
          <div className="relative z-10 flex flex-col justify-between flex-grow">
            <Gem className="w-10 h-10 sm:w-14 sm:h-14" />
            <div>
              <h4 className="text-lg sm:text-xl font-semibold">
                Predictive Analytics
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">
                Custom AI Solutions tailored to meet your unique business needs,
                leveraging.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 min-h-[420px]  mx-auto before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-[linear-gradient(to_right,#e30613,#e3061583)] before:rounded-t-[999px] before:rounded-b-[16px] before:z-0 before:origin-bottom before:transition-all before:duration-700 before:ease-in-out hover:before:h-full hover:before:rounded-t-[16px] hover:before:rounded-b-[16px] overflow-hidden">
          <div className="relative z-10 flex flex-col justify-between flex-grow">
            <Puzzle className="w-10 h-10 sm:w-14 sm:h-14" />
            <div>
              <h4 className="text-lg sm:text-xl font-semibold">
                AI Model Training
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">
                Custom AI Solutions tailored to meet your unique business needs,
                leveraging.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-5 sm:p-6 border border-white/10 min-h-[420px]  w-full mx-auto relative overflow-visible flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm sm:text-base">Need Any Help!</p>
            <p className="text-base sm:text-lg flex items-center gap-2">
              <Phone /> +1234567890
            </p>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[250px]">
            <Image
              src={"/Vision/vission.png"}
              alt="vision"
              height={250}
              width={250}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
