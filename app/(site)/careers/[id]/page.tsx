"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import HeroBackground from "@/components/Hero/HeroBackground";
import Title from "@/components/Extra/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { toast } from "sonner";
import { isApiError } from "@/components/Extra/ApiError";

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

const JobDetailsClient = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>({
    JobTitle: "",
    Job_Description: "",
    createdAt: new Date(),
    id: 0,
    updatedAt: new Date(),
    Min_exp: 0,
    Max_exp: 0,
    Job_type: "",
    Salary: null,
    Primary_Skills: [],
    Secondary_Skills: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchSingleJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${Number(id)}`);
      const data = await response.json();
      setJob(data.job);
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id) fetchSingleJob();
  }, [id]);

  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phoneNo: "",
    applied_for: id,
    qualification: [] as string[],
    start_date: "",
    cover_letter: "",
    resume: null as File | null,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Please upload your resume");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result !== "string") {
        toast.error("Failed to read resume file.");
        return;
      }

      const base64Data = reader.result.split(",")[1];
      const payload = {
        ...formData,
        resume: {
          name: formData.resume?.name,
          type: formData.resume?.type,
          data: base64Data,
        },
      };

      try {
        const response = await fetch("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.missing) {
            toast.error(`Missing skills: ${errorData.missing.join(", ")}`);
          } else {
            toast.error(errorData.message || "Failed to submit application");
          }
          return;
        }

        toast.success("Application submitted successfully!");
        setFormData({
          applicantName: "",
          email: "",
          phoneNo: "",
          applied_for: id,
          qualification: [],
          start_date: "",
          cover_letter: "",
          resume: null,
        });
      } catch (err: unknown) {
            if (isApiError(err)) {
              toast.error(err.data?.message || "Failed to create blog");
            } else {
              toast.error("Failed to create blog");
            }
          }
    };

    reader.readAsDataURL(formData.resume);
  };

  const handleQualificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = e.target.value.split(",").map((q) => q.trim());
    setFormData((prev) => ({ ...prev, qualification: values }));
  };
  const handleReset = () => {
    setFormData({
      applicantName: "",
      email: "",
      phoneNo: "",
      applied_for: id,
      qualification: [],
      start_date: "",
      cover_letter: "",
      resume: null,
    });
  };
  const router = useRouter();

  return (
    <div className="select-none">
      <div className="relative w-full overflow-hidden min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] xl:min-h-[65vh]">
        <Navbar />
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Be Part Of"
              gradheading="Our Mission"
              description="We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility"
            />

            <motion.div
              className="mt-6 mx-auto flex items-center-safe justify-center-safe"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Link href="/" className="text-base">
                      Home
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon className="-rotate-[20deg]" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Link href="/careers" className="text-base">
                      Careers
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon className="-rotate-[20deg]" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Link href={`/careers/${id}`} className="text-base">
                      {job.JobTitle}
                    </Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-36 xl:mx-48 mb-20">
        {loading ? (
          <div className="text-center py-20 text-white">
            Loading job details...
          </div>
        ) : (
          <div className="group bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between border border-white/20 shadow-2xl hover:shadow-3xl hover:border-white/30 relative overflow-hidden">
            <div className="mb-12 ">
              <h1 className="text-4xl font-bold mb-4">{job.JobTitle}</h1>
              <p className="text-lg text-white/70 mb-6">
                {job.Job_Description}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 border border-white/30 rounded-full text-sm text-white/80 bg-black/20">
                  💼{" "}
                  {job.Job_type.includes("_")
                    ? job.Job_type.replace("_", " ")
                    : job.Job_type}
                </span>
                <span className="px-4 py-2 border border-white/30 rounded-full text-sm text-white/80 bg-black/20">
                  ⏰ {job.Min_exp} - {job.Max_exp} yrs
                </span>
                {job.Salary && (
                  <span className="px-4 py-2 border border-green-400/50 rounded-full text-sm text-green-300 bg-green-400/10">
                    ₹ {job.Salary}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.Primary_Skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 border border-white/20 rounded-lg text-sm text-white/90 bg-[#00000040]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Optional Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.Secondary_Skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 border border-white/20 rounded-lg text-sm text-white/90 bg-[#00000040]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold mb-6">
                Apply for this position
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Applying For</label>
                  <input
                    type="text"
                    name="applyingFor"
                    value={formData.applied_for}
                    readOnly
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Available Start Date
                  </label>
                  <input
                    id="myDate"
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 placeholder:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Qualifications (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech, M.Sc, MBA"
                    onChange={handleQualificationChange}
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Upload Resume</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-[#e30613] file:text-white hover:file:bg-[#c40510] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Cover Letter</label>
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3"
                  />
                </div>

                <div className="flex gap-20">
                  <button
                    type="submit"
                    className="w-1/3 bg-[#e30613] hover:bg-[#c40510] duration-500 transition-all text-white font-semibold py-3 rounded-xl"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-1/3 bg-[#e30613] hover:bg-[#c40510] duration-500 transition-all text-white font-semibold py-3 rounded-xl"
                  >
                    Reset Application
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/careers")}
                    className="w-1/3 bg-[#e30613] hover:bg-[#c40510] duration-500 transition-all text-white font-semibold py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsClient;
