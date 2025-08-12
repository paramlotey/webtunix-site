"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import Herocarousel from "./Herocarousel";
import Grow from "./Grow";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isChatOpen ? "hidden" : "";
  }, [isChatOpen]);

  const initiateSearch = async (value?: string) => {
    const input = chat ?? value;
    if (!chat.trim()) return;

    setIsChatOpen(true);
    setChatResponse("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              console.log("Stream completed");
              return;
            }

            if (data === "[ERROR]") {
              setChatResponse(
                (prev) =>
                  prev + "\n\nError occurred while processing your request."
              );
              return;
            }

            setChatResponse((prev) => prev + data);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setChatResponse(
        "Sorry, there was an error processing your request. Please try again."
      );
    }
  };

  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] xl:min-h-[85vh]">
        <Navbar />
        <div className="absolute inset-0 -top-[5rem]">
          <Image
            src="/Hero/hero-bg-shape.png"
            alt="Hero background"
            fill
            priority
            quality={90}
            className="object-cover pointer-events-none"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.04) 30%,rgba(8,8,12,0.3) 60%,rgba(0,0,0,0.85) 100%)`,
            }}
          />
        </div>

        <Image
          src="/Hero/section-bg-shape-1.png"
          alt="shape-1"
          width={80}
          height={80}
          className="hidden sm:block absolute top-36 left-4 md:left-10 lg:left-36 w-10 h-10 sm:w-14 sm:h-14 md:w-28 md:h-28 animate-spin-slow  duration-300 pointer-events-none"
        />
        <Image
          src="/Hero/section-bg-shape-3.png"
          alt="shape-3"
          width={80}
          height={80}
          className="hidden md:block absolute bottom-36 left-6 lg:left-72 w-9 h-9 sm:w-12 sm:h-12 md:w-28 md:h-28 animate-spin-slow  duration-300 pointer-events-none"
        />
        <Image
          src="/Hero/section-bg-shape-2.png"
          alt="shape-2"
          width={80}
          height={80}
          className="hidden sm:block absolute top-36 right-4 md:right-10 lg:right-36 w-10 h-10 sm:w-14 sm:h-14 md:w-28 md:h-28 animate-spin-slow  duration-300 pointer-events-none"
        />
        <Image
          src="/Hero/section-bg-shape-4.png"
          alt="shape-4"
          width={80}
          height={80}
          className="hidden md:block absolute bottom-30 right-6 lg:right-72 w-9 h-9 sm:w-12 sm:h-12 md:w-28 md:h-28 animate-spin-slow  duration-300 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-tight mb-4 sm:mb-6"
            >
              Designing smarter tomorrows with{" "}
              <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
                AI today!{" "}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-4 sm:mt-6 text-[#A7AABB] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Have tech questions? Our AI answer engine can help you find
              solutions faster than ever before.
            </motion.p>

            {/* Fixed: Always render buttons but animate them in */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-3 sm:gap-4 md:gap-6 justify-center flex-wrap"
            >
              <button
                className="relative overflow-hidden z-10 bg-black text-white border border-[#e30613] rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#e30613] before:z-[-1] before:skew-x-[45deg] before:origin-bottom-left before:transition-all before:duration-1000 before:ease-in-out
                hover:before:w-full hover:before:skew-x-0 hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transform transition-all duration-300"
              >
                Get Started Today
              </button>

              <button
                className="group bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium
                hover:scale-105 hover:shadow-lg hover:shadow-[#e30613]/25 transform transition-all duration-300"
              >
                Ask Now
              </button>
            </motion.div>

            <div className="w-full max-w-2xl mt-4 sm:mt-6 mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Please ask a question or initiate a search"
                  className={`placeholder:text-white pl-12 sm:pl-14 py-3 sm:py-6 focus-visible:ring-0 focus-visible:border-[#e3061583] text-white border-[#e3061583] !bg-[#e3061583] w-full ${
                    selectOpen && chat ? "!rounded-b-none" : null
                  }`}
                  value={chat}
                  onChange={(e) => {
                    const value = e.target.value;
                    setChat(value);
                    setSelectOpen(value.trim().length > 0);
                  }}
                />

                <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/Hero/input2.gif"
                    alt="input"
                    height={40}
                    width={40}
                    className="mix-blend-screen rounded-full"
                  />
                </div>

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-2"
                  onClick={() => initiateSearch()}
                >
                  <Search size={18} className="text-white" />
                </button>

                {selectOpen && (
                  <div className="absolute left-0 right-0  max-h-48 overflow-auto bg-red-700 rounded-b-md shadow-lg z-20 text-sm">
                    <div className="p-2 text-white">Suggestions</div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {[
                  "What services does Webtunix offer in AI Computing?",
                  "Generative AI Trends in 2025",
                  "More Questions",
                ].map((title, i) => (
                  <div
                    onClick={() => initiateSearch(title)}
                    key={i}
                    className="group flex items-center justify-between px-4 py-2 rounded bg-gradient-to-r from-[#e30613] to-[#e3061583] text-white font-medium shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    <p className="text-sm sm:text-base leading-snug text-left">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Herocarousel />
      </div>

      <div
        className={`fixed inset-0 bg-red-500 z-50 transform transition-all duration-500 ease-out ${
          isChatOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ transformOrigin: "top center" }}
      >
        <button
          onClick={() => {
            setIsChatOpen(false), setChat("");
          }}
          className="absolute top-4 right-4 text-white text-2xl sm:text-3xl hover:scale-110 transition-transform"
        >
          <X />
        </button>

        <div className="flex flex-col items-center justify-center h-full text-white w-full px-4">
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              AI Response
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg w-full h-[60vh] overflow-y-auto whitespace-pre-wrap">
              {chatResponse || "Waiting for response..."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
