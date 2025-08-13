import React from "react";
import Image from "next/image";

interface HeroBackgroundProps {
  isHomepage?: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ isHomepage = false }) => {
  return (
    <>
      {/* Background Image */}
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

      {/* Shapes */}
      <Image
        src="/Hero/section-bg-shape-1.png"
        alt="shape-1"
        width={80}
        height={80}
        className="hidden sm:block absolute top-36 left-4 md:left-10 lg:left-36 w-10 h-10 sm:w-14 sm:h-14 md:w-28 md:h-28 animate-spin-slow pointer-events-none"
      />
      <Image
        src="/Hero/section-bg-shape-2.png"
        alt="shape-2"
        width={80}
        height={80}
        className="hidden sm:block absolute top-36 right-4 md:right-10 lg:right-36 w-10 h-10 sm:w-14 sm:h-14 md:w-28 md:h-28 animate-spin-slow pointer-events-none"
      />
      
      {/* Conditional shapes for homepage only */}
      {isHomepage && (
        <>
          <Image
            src="/Hero/section-bg-shape-3.png"
            alt="shape-3"
            width={80}
            height={80}
            className="hidden md:block absolute bottom-36 left-6 lg:left-72 w-9 h-9 sm:w-12 sm:h-12 md:w-28 md:h-28 animate-spin-slow pointer-events-none"
          />
          <Image
            src="/Hero/section-bg-shape-4.png"
            alt="shape-4"
            width={80}
            height={80}
            className="hidden md:block absolute bottom-30 right-6 lg:right-72 w-9 h-9 sm:w-12 sm:h-12 md:w-28 md:h-28 animate-spin-slow pointer-events-none"
          />
        </>
      )}
    </>
  );
};

export default HeroBackground;