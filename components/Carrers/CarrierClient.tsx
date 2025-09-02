"use client";
import React, { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

interface Skill {
  name: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
}

interface Job {
  JobTitle: string;
  Job_Description: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  Min_exp: number;
  Max_exp: number;
  Job_type: string;
  Salary: string | null;
  Primary_Skills: string[];
  Secondary_Skills: string[];
}

const CareerClient = ({ jobs, skills }: { jobs: Job[]; skills: Skill[] }) => {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Derived filtered jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (selectedSkill) {
      result = result.filter(
        (job) =>
          job.Primary_Skills.includes(selectedSkill) ||
          job.Secondary_Skills.includes(selectedSkill)
      );
    }

    if (search.trim() !== "") {
      result = result.filter(
        (job) =>
          job.JobTitle.toLowerCase().includes(search.toLowerCase()) ||
          job.Job_Description.toLowerCase().includes(search.toLowerCase())||
          job.Primary_Skills.forEach((i)=>(i.toLowerCase().includes(search.toLowerCase())))
      );
    }
    return result;
  }, [jobs, search, selectedSkill]);

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };
  return (
    <>
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
              Available Positions
            </h2>
            <p className="text-white/70 text-lg">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "position" : "positions"} found
              {selectedSkill && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#e30613] text-white">
                  {selectedSkill}
                </span>
              )}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col lg:flex-row gap-12 mx-auto select-none">
        <main className="flex-1 min-h-screen">
          {filteredJobs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className="group bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30 hover:scale-[1.02] transform relative overflow-hidden"
                  variants={cardVariants}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#e30613] transition-colors duration-300 line-clamp-2 leading-tight">
                        {job.JobTitle}
                      </h3>
                      <p className="text-sm text-white/70 line-clamp-3 mb-4 leading-relaxed">
                        {job.Job_Description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-4 py-2 border border-white/30 rounded-full text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-300">
                        💼{" "}
                        {job.Job_type.includes("_")
                          ? job.Job_type.replace("_", " ")
                          : job.Job_type}
                      </span>
                      <span className="px-4 py-2 border border-white/30 rounded-full text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-300">
                        ⏰ {job.Min_exp} - {job.Max_exp} yrs
                      </span>
                      {job.Salary && (
                        <span className="px-4 py-2 border border-green-400/50 rounded-full text-xs font-medium text-green-300 bg-green-400/10 backdrop-blur-sm">
                          ₹ {job.Salary}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                        Key Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.Primary_Skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 border border-white/20 rounded-lg text-xs font-medium text-white/90 bg-[#00000040] backdrop-blur-sm hover:bg-[#00000060] transition-all duration-300 hover:scale-105 transform"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.Primary_Skills.length > 4 && (
                          <span className="px-3 py-2 border border-[#e30613]/50 rounded-lg text-xs font-medium text-[#e30613] bg-[#e30613]/10">
                            +{job.Primary_Skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <a
                      href={`/careers/${job.id}`}
                      className="group/btn inline-block w-full text-center bg-[#e30613] hover:bg-[#c40510] text-white text-sm font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#e30613]/25 transform hover:scale-105 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Apply Now
                        <svg
                          className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
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
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Jobs Found
                </h3>
                <p className="text-white/60 text-lg max-w-md mx-auto">
                  Try adjusting your search criteria or browse all available
                  positions.
                </p>
              </div>
              {(search || selectedSkill) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedSkill(null);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e30613] hover:bg-[#c40510] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 transform"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </main>
        <aside className="lg:w-96 w-full lg:sticky lg:top-32 self-start flex-shrink-0">
          <div className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col space-y-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[#e30613] to-transparent rounded-full"></div>
                <h4 className="text-base font-bold uppercase tracking-wider text-white/90 select-none">
                  Search Jobs
                </h4>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Type to search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:border-transparent transition-all duration-300 group-hover:border-white/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e30613]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[#e30613] to-transparent rounded-full"></div>
                <h4 className="text-base font-bold uppercase tracking-wider text-white/90 select-none">
                  Sort Order
                </h4>
              </div>
              <div className="relative group">
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "asc" | "desc")
                  }
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:border-transparent transition-all duration-300 appearance-none cursor-pointer group-hover:border-white/30"
                >
                  <option value="asc" className="bg-gray-900">
                    📅 Oldest First
                  </option>
                  <option value="desc" className="bg-gray-900">
                    🆕 Newest First
                  </option>
                </select>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e30613]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[#e30613] to-transparent rounded-full"></div>
                <h4 className="text-base font-bold uppercase tracking-wider text-white/90 select-none">
                  Filter Skills
                </h4>
              </div>
              <div
                className="max-h-80 overflow-y-auto pr-2 space-y-3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(227, 6, 19, 0.5) transparent",
                }}
              >
                <button
                  onClick={() => setSelectedSkill(null)}
                  className={`w-full ${
                    !selectedSkill
                      ? "bg-[#e30613] text-white shadow-lg shadow-[#e30613]/25 scale-105"
                      : "bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061590] hover:to-[#e30613] text-white/90 hover:text-white"
                  } rounded-xl px-4 py-3 text-sm font-semibold text-center transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-md`}
                >
                  ✨ View All Jobs
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSkill(item.name)}
                      className={`${
                        selectedSkill === item.name
                          ? "bg-[#e30613] text-white shadow-lg shadow-[#e30613]/25 scale-105 border-[#e30613]"
                          : "bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061590] hover:to-[#e30613] text-white/90 hover:text-white border-white/10 hover:border-white/20"
                      } rounded-xl px-4 py-3 text-sm font-medium text-center transition-all duration-300 border hover:shadow-md hover:scale-102 transform`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CareerClient;
