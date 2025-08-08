"use client";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  const story = async () => {
    try {
      const response = await fetch(`/api/ask`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };

  return (
    <>
      <div className="relative bg-[url('/Hero/hero-bg-shape.png')] bg-center bg-cover bg-no-repeat py-[32rem] bottom-[11rem] bg-radial">
        <img
          src={"/Hero/section-bg-shape-1.png"}
          alt="shape-1"
          className="absolute top-1/4 left-40 animate-spin-slow"
        ></img>
        <img
          src={"/Hero/section-bg-shape-3.png"}
          alt="shape-3"
          className="absolute top-3/4 left-64 animate-spin-slow"
        ></img>
        <img
          src={"/Hero/section-bg-shape-2.png"}
          alt="shape-2"
          className="absolute top-1/4 right-40 animate-spin-slow"
        ></img>
        <img
          src={"/Hero/section-bg-shape-4.png"}
          alt="shape-4"
          className="absolute top-3/4 right-64 animate-spin-slow"
        ></img>
        <div className="absolute top-7/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-medium text-white leading-tight">
            Transform your business with the{" "}
            <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-300">
              power of AI
            </span>
          </h1>
          <p className="mt-6 text-[#A7AABB] text-lg md:text-xl">
            Have tech questions? Our AI answer engine can help.
          </p>
          <div className="mt-10 flex items-center gap-6 justify-center flex-wrap">
            <Button
              onClick={story}
              className="relative overflow-hidden z-10 bg-black text-white border border-[#e30613] rounded-full px-8 py-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#e30613] before:z-[-1] before:skew-x-[45deg] before:origin-bottom-left before:transition-all before:duration-1000 before:ease-in-out hover:before:w-full hover:before:skew-x-0"
            >
              Get Started Today
            </Button>
            <Button className="group bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-8 py-4 transition-all duration-300 text-lg">
              Ask
            </Button>
          </div>
        </div>
        <p className="absolute bottom-0 flex justify-center text-center text-[#A7AABB] text-lg md:text-xl w-full bg-black">
          Already chosen by the leaders
        </p>
      </div>
    </>
  );
};

export default Hero;
