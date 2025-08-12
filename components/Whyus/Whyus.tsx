import { ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import React from "react";

const Whyus = () => {
  return (
    <section className="my-20">
      <div className="w-full mx-auto px-6 md:px-12">
        <div className="flex items-start gap-12">
          <div className="relative w-1/2 flex justify-center">
            <div
              aria-hidden
              className="absolute -top-1/6 left-1/2 w-2/3 h-2/3 -translate-x-1/2 rounded-full bg-[#e30613] opacity-20 blur-3xl z-0"
            />
            <Image
              src="/Why/why-choose.png"
              alt="robot"
              width={400}
              height={800}
              className="relative z-10 object-contain"
              priority
            />
          </div>

          <div className="w-1/2">
            <div className="flex">
              <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
                <span className="text-[#e30613]">{"\u2726"}</span> Why Choose Us{" "}
                <span className="text-[#e30613]">{"\u2726"}</span>
              </h3>
            </div>

            <h2 className="mt-6 text-5xl font-bold">
              Discover why businesses trust our AI solutions
            </h2>

            <p className="mt-4 text-gray-500 max-w-[640px] text-lg leading-relaxed">
              Discover why businesses trust our AI solutions: reliable,
              scalable, and tailored to drive smarter decisions and measurable
              results.
            </p>

            <div className="mt-8 flex gap-12">
              <ul className="space-y-4 w-1/2">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e30613]  text-white text-xs">
                    ✓
                  </span>
                  <span className="text-gray-500">
                    Proven Accuracy and Reliability
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e30613]  text-white text-xs">
                    ✓
                  </span>
                  <span className="text-gray-500">
                    Scalable for Any Business Size
                  </span>
                </li>
              </ul>

              <ul className="space-y-4 w-1/2">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e30613] text-white text-xs">
                    ✓
                  </span>
                  <span className="text-gray-500">
                    Real-Time Insights and Analytics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e30613] text-white text-xs">
                    ✓
                  </span>
                  <span className="text-gray-500">
                    Customizable to Industry Needs
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-10">
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full p-2 bg-[#e30613] flex items-center justify-center shadow-sm">
                      <Globe color="white" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">
                        24/7 Support and Maintenance
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full p-2 bg-[#e30613] flex items-center justify-center shadow-sm">
                      <Globe color="white" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">
                        Cost-Efficient and ROI-Driven
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  role="img"
                  aria-label="Spinning circular text saying Get Started Today with a downward arrow"
                  className="relative w-52 h-52 flex items-center justify-center group cursor-pointer"
                >
                  <svg
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
                      />
                    </defs>
                    <text
                      fill="white"
                      fontSize="21"
                      letterSpacing="2.2"
                      className="drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]"
                    >
                      <textPath xlinkHref="#circlePath" startOffset="0%">
                        * Get Started Today * Get Started Today
                      </textPath>
                    </text>
                  </svg>

                  <ArrowUpRight
                    className="select-none group-hover:scale-150 group-hover:rotate-45 duration-300 group-hover:bg-gradient-to-r group-hover:from-[#e3061583] group-hover:to-[#e30613] bg-clip-text "
                    size={40}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
