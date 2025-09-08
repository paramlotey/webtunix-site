"use client";

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

const OurProjects = () => {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics",
      description:
        "Revolutionary machine learning system for early disease detection and medical imaging analysis.",
      image: "/Service/service-1.webp",
      category: "Healthcare AI",
    },
    {
      id: 2,
      title: "Smart Financial Trading Bot",
      description:
        "Advanced neural network system for automated trading and market prediction with real-time analysis.",
      image: "/Service/service-2.webp",
      category: "FinTech AI",
    },
    {
      id: 3,
      title: "Natural Language Processing Suite",
      description:
        "Comprehensive NLP solution for sentiment analysis, chatbots, and content generation.",
      image: "/Service/service-1.webp",
      category: "NLP Solutions",
    },
    {
      id: 4,
      title: "Computer Vision Security System",
      description:
        "Real-time object detection and facial recognition system for enhanced security monitoring.",
      image: "/Service/service-2.webp",
      category: "Computer Vision",
    },
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
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center border border-white/20">
          <span className="text-[#e30613]">{"\u2726"}</span> Our Projects{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        className="mx-auto text-center text-2xl sm:text-3xl lg:text-5xl max-w-4xl my-6 sm:my-8 font-semibold leading-snug sm:leading-tight px-4 capitalize"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        Real projects, real impact, real{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
          intelligence
        </span>
      </motion.h2>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-500 min-h-[420px] sm:min-h-[480px] flex flex-col justify-end"
            variants={fadeUpVariants}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105 group-hover:blur"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
            {/* Light Sweep Effect */}
            <div className="absolute inset-0 after:content-[''] after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-[#ffffff4d] after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:z-10 group-hover:after:h-full group-hover:after:bg-transparent group-hover:after:transition-all group-hover:after:duration-700" />
            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-[#e30613]/90 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-1 rounded-full font-medium">
                {project.category}
              </span>
            </div>
            {/* Content */}
            <div className="relative z-20 p-5 sm:p-6 md:p-8">
              <h4 className="font-bold mb-3 text-white leading-tight text-lg sm:text-xl lg:text-2xl">
                {project.title}
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <button className="bg-gradient-to-r from-[#e30613] to-[#b10510] text-white rounded-full px-5 py-2.5 text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 group-hover:from-[#b10510] group-hover:to-[#e30613]">
                  View Details
                </button>
                <button className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors duration-300">
                  Learn More
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div
        className="text-center mt-10 sm:mt-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <button className="bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transform transition-all duration-300 hover:bg-white/10 hover:border-white/30">
          View All Projects
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2 transform transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default OurProjects;
