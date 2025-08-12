import React from "react";

const OurProjects = () => {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics",
      description:
        "Revolutionary machine learning system for early disease detection and medical imaging analysis.",
      image: "/Service/service-1.jpg",
      category: "Healthcare AI",
    },
    {
      id: 2,
      title: "Smart Financial Trading Bot",
      description:
        "Advanced neural network system for automated trading and market prediction with real-time analysis.",
      image: "/Service/service-2.jpg",
      category: "FinTech AI",
    },
    {
      id: 3,
      title: "Natural Language Processing Suite",
      description:
        "Comprehensive NLP solution for sentiment analysis, chatbots, and content generation.",
      image: "/Service/service-1.jpg",
      category: "NLP Solutions",
    },
    {
      id: 4,
      title: "Computer Vision Security System",
      description:
        "Real-time object detection and facial recognition system for enhanced security monitoring.",
      image: "/Service/service-2.jpg",
      category: "Computer Vision",
    },
  ];

  return (
    <section className="my-16">
      <div className="flex justify-center">
        <h3 className="text-sm sm:text-base uppercase bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 tracking-widest border border-white/20">
          <span className="text-[#e30613]">{"\u2726"}</span> Our Projects{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </div>

      <h2 className="mx-auto text-center text-3xl sm:text-4xl lg:text-5xl max-w-4xl my-8 font-semibold leading-tight">
        Real projects, real impact, real{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
          intelligence
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-500 min-h-[500px]"
          >
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105 group-hover:blur"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
            <div className="absolute inset-0 after:content-[''] after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-[#ffffff4d] after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:z-10 group-hover:after:h-full group-hover:after:bg-transparent group-hover:after:transition-all group-hover:after:duration-700" />
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-[#e30613]/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                {project.category}
              </span>
            </div>
            <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
              <h4 className="font-bold mb-3 text-white leading-tight text-2xl lg:text-3xl">
                {project.title}
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed text-base lg:text-lg">
                {project.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <button className="bg-gradient-to-r from-[#e30613] to-[#b10510] text-white rounded-full px-6 py-3 text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 group-hover:from-[#b10510] group-hover:to-[#e30613]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-full px-8 py-4 text-base font-medium transform transition-all duration-300 hover:bg-white/10 hover:border-white/30">
          View All Projects
          <svg
            className="w-5 h-5 inline-block ml-2 transform transition-transform duration-300"
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
      </div>
    </section>
  );
};

export default OurProjects;
