"use client";
import { MoveUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrolltoTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-gradient-to-bl from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white  p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <MoveUp size={16} />
    </button>
  );
};

export default ScrolltoTopBtn;
