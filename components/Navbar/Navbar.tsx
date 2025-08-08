import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const Navbar = () => {
  
  return (
    <header className="relative top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm">
      <nav className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/Logo/logo.webp"
              alt="Logo"
              width={100}
              height={100}
              className="h-40 w-40 object-contain invert"
              priority
            />
          </Link>
        </div>
        <div>
          
        </div>
        <ul className="hidden md:flex items-center space-x-12 text-lg  text-white bg-[#ffffff0f] border-[#ffffff0f] border backdrop-blur-md rounded-full px-8 py-2">
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link href="#home" className="hover:text-[#e30613] transition">
                  Home
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link href="#about" className="hover:text-[#e30613] transition">
                  About Us
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link
                  href="#services"
                  className="hover:text-[#e30613] transition"
                >
                  Services
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link href="#blog" className="hover:text-[#e30613] transition">
                  Blog
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link href="#pages" className="hover:text-[#e30613] transition">
                  Pages
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
          <li>
            <HoverCard openDelay={1.2}>
              <HoverCardTrigger>
                <Link
                  href="#contact"
                  className="hover:text-[#e30613] transition"
                >
                  Contact Us
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </li>
        </ul>

        <div className="hidden md:block">
          <Button className="group bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full p-6 transition-all duration-300 text-lg">
            Get Started
          </Button>
        </div>

        <div className="md:hidden"></div>
      </nav>
    </header>
  );
};

export default Navbar;
