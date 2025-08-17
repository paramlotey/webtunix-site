"use client"
import { Database, Globe } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Globe aria-label="Globe icon" />,
    title: "Discovery & Strategy",
    description:
      "We dive deep into your goals and challenges to uncover high-impact AI opportunities and craft a clear strategy.",
  },
  {
    icon: <Database aria-label="Database icon" />,
    title: "Data & Infrastructure Assessment",
    description:
      "We analyze your data and infrastructure to ensure a strong foundation for AI integration.",
  },
  {
    icon: <Globe aria-label="Globe icon" />,
    title: "Custom AI Development",
    description:
      "Tailored AI models developed to meet your unique business needs and objectives.",
  },
  {
    icon: <Database aria-label="Database icon" />,
    title: "Optimization & Support",
    description:
      "Continuous improvements and dedicated support to maximize your AI investment.",
  },
];

const How = () => {
  return (
    <section
      className="bg-black text-white py-16 sm:py-20"
      aria-labelledby="how-we-work-title"
    >
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Section */}
          <div className="lg:w-1/2">
            {/* Tag */}
            <div className="mb-6 sm:mb-8">
              <h3
                id="how-we-work-title"
                className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center inline-block"
              >
                <span className="text-[#e30613]" aria-hidden="true">
                  {"\u2726"}
                </span>{" "}
                How We Work{" "}
                <span className="text-[#e30613]" aria-hidden="true">
                  {"\u2726"}
                </span>
              </h3>
            </div>

            {/* Heading */}
            <h2 className="text-left text-2xl sm:text-3xl lg:text-5xl max-w-4xl mb-8 sm:mb-12 font-semibold leading-snug sm:leading-tight">
              Our process for smarter{" "}
              <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
                AI solutions
              </span>
            </h2>

            {/* Steps */}
            <div className="flex flex-col gap-5">
              {steps.map(({ icon, title, description }, index) => (
                <motion.article
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between min-h-[160px] sm:min-h-[200px] bg-white/5 rounded-2xl p-6 gap-4 sm:gap-0"
                  aria-label={`Step ${index + 1}: ${title}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  {/* Step Icon & Number */}
                  <div className="flex flex-col items-start sm:items-center sm:pr-6 sm:border-r border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-[#e30613] flex items-center justify-center mb-2 text-white">
                      {icon}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 font-mono">
                      Step 0{index + 1}
                    </span>
                  </div>

                  {/* Step Text */}
                  <div className="w-full sm:w-2/3 flex flex-col items-start">
                    <h5 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                      {title}
                    </h5>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <aside className="lg:w-1/2 lg:sticky lg:top-10 self-start">
            <div className="overflow-hidden rounded-lg">
              <div className="aspect-square overflow-hidden rounded-lg">
                <video
                  src={"/How/how.mp4"}
                  className="w-full h-auto object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Video demonstrating AI solutions process"
                >
                  Sorry, your browser does not support the video tag.
                </video>
              </div>
              <div className="text-center mt-4 sm:mt-6 px-4">
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base max-w-xl mx-auto">
                  We help businesses design, build, and deploy intelligent solutions
                  that drive real results.
                </p>
                <button
                  className="bg-[#e30613] hover:bg-[#c50512] text-white px-6 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-[#e30613]/50 text-sm sm:text-base"
                  aria-label="Contact us now"
                >
                  Contact Now
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default How;
