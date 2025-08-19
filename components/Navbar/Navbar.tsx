"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "/blogs", label: "Blogs" },
    { href: "#pages", label: "Pages" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <header className="relative top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm border-b border-white/10">
      <nav className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo/logo.webp"
            alt="Logo"
            width={100}
            height={100}
            className="h-12 w-auto object-contain invert"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-base font-medium text-white bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-8 py-2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              {/* <HoverCard openDelay={200}>
                <HoverCardTrigger asChild> */}
                  <Link
                    href={href}
                    className="hover:text-[#e30613] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                {/* </HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard> */}
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-6 py-3 text-base font-medium transition-all duration-300">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-white/10 transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col space-y-4 px-6 py-6 text-white text-base">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-[#e30613] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Button className="w-full bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white rounded-full px-6 py-3 text-base font-medium transition-all duration-300">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
