"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Change navbar after 150px scroll (adjust as needed)
      setScrolled(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: `About` },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm border-b border-transparent transition-colors duration-500 ${
        scrolled ? "bg-black  border-white/30" : "bg-transparent"
      }`}
    >
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
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Link
                    href={href}
                    className="hover:text-[#e30613] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </HoverCardTrigger>
                {/* About Us Hover Content */}
                {label === "About" && (
                  <HoverCardContent className="w-full mt-3 bg-[#1b1b1b] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat text-white border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <h5 className="text-lg font-semibold tracking-wide border-l-4 border-[#e30613] pl-3">
                        Join Our Team
                      </h5>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Webtunix AI
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Why Webtunix AI */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Why Webtunix AI
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-1 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Our Team
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Why Work With Us
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            What We Do
                          </p>
                        </div>
                      </div>

                      {/* Extra */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Extra
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Fun At Webtunix AI
                          </p>
                        </div>
                      </div>

                      {/* Careers */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Careers
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            <Link href={"/careers"}> We Are Hiring!</Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex space-x-3 mt-8">
                      <Link
                        href="/about"
                        className="flex-1 bg-[#e30613] hover:bg-[#ff1c2a] px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Meet Our Team
                      </Link>
                      <Link
                        href="/careers"
                        className="flex-1 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Join Us
                      </Link>
                    </div>
                  </HoverCardContent>
                )}

                {/* Services Hover Content */}
                {label === "Services" && (
                  <HoverCardContent className="w-full mt-3 bg-[#1b1b1b] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat text-white border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <h5 className="text-lg font-semibold tracking-wide border-l-4 border-[#e30613] pl-3">
                        Our Services
                      </h5>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Webtunix AI
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Mobile Services */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Mobile
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-1 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Mobile App Development
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Cross Platform App Development
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            App Prototype & Strategy
                          </p>
                        </div>
                      </div>

                      {/* Web Services */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Web
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Web Development
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Ecommerce & CMS
                          </p>
                        </div>
                      </div>

                      {/* Digital Marketing */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Digital Marketing
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Search Engine Optimization
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Pay Per Click
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Social Media Marketing
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Buttons (Modified) */}
                    <div className="flex space-x-3 mt-8">
                      <Link
                        href="/services"
                        className="flex-1 bg-[#e30613] hover:bg-[#ff1c2a] px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Explore Services
                      </Link>
                      <Link
                        href="/contact-us"
                        className="flex-1 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  </HoverCardContent>
                )}

                {/* Portfolio Hover Content */}
                {label === "Portfolio" && (
                  <HoverCardContent className="w-full mt-3 bg-[#1b1b1b] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat text-white border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <h5 className="text-lg font-semibold tracking-wide border-l-4 border-[#e30613] pl-3">
                        Our Portfolio
                      </h5>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Webtunix AI
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Case Studies */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Case Studies
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-1 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            AI in Healthcare
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Fintech Solutions
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Retail & E-commerce
                          </p>
                        </div>
                      </div>

                      {/* Projects */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Projects
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Web Applications
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Mobile Apps
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Machine Learning Models
                          </p>
                        </div>
                      </div>

                      {/* Industries */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Industries
                        </h4>
                        <div className="border-l border-white/20 pl-3 text-gray-400 text-sm">
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Healthcare
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Finance
                          </p>
                          <p className="hover:text-white transition-colors cursor-pointer">
                            Education
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Buttons (Modified) */}
                    <div className="flex space-x-3 mt-8">
                      <Link
                        href="/portfolio"
                        className="flex-1 bg-[#e30613] hover:bg-[#ff1c2a] px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        View Our Work
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Start Your Project
                      </Link>
                    </div>
                  </HoverCardContent>
                )}

                {/* Contact Hover Content */}
                {label === "Contact Us" && (
                  <HoverCardContent className="w-full mt-3 bg-[#1b1b1b] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat text-white border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <h5 className="text-lg font-semibold tracking-wide border-l-4 border-[#e30613] pl-3">
                        Contact Us
                      </h5>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Webtunix AI
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Office Address */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Office
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-1 text-gray-400 text-sm">
                          <p>Webtunix AI Pvt. Ltd.</p>
                          <p>E-331, Phase 8B, Industrial Area</p>
                          <p>Sahibzada Ajit Singh Nagar, Punjab 160055</p>
                        </div>
                      </div>

                      {/* Contact Details with Flags */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Get in Touch
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-3 text-gray-400 text-sm">
                          <div>
                            <p className="font-medium text-gray-300">
                              For SEO/PPC Inquiry
                            </p>
                            <p className="hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                              <span>🇺🇸</span> <span>+1 123 456 7890</span>
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-300">
                              For Web/Mobile Development Inquiry
                            </p>
                            <p className="hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                              <span>🇺🇸</span> <span>+1 123 456 7890</span>
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-300">
                              For HR Inquiry
                            </p>
                            <p className="hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
                              <span>🇮🇳</span> <span>+91 12345 67890</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="capitalize group">
                        <h4 className="uppercase text-sm font-bold text-gray-200 mb-2 group-hover:text-[#e30613] transition-colors">
                          Follow Us
                        </h4>
                        <div className="border-l border-white/20 pl-3 space-y-1 text-gray-400 text-sm">
                          <Link
                            href="https://facebook.com/webtunix"
                            target="_blank"
                            className="hover:text-white transition-colors cursor-pointer block"
                          >
                            Facebook
                          </Link>
                          <Link
                            href="https://linkedin.com/company/webtunix"
                            target="_blank"
                            className="hover:text-white transition-colors cursor-pointer block"
                          >
                            LinkedIn
                          </Link>
                          <Link
                            href="https://twitter.com/webtunix"
                            target="_blank"
                            className="hover:text-white transition-colors cursor-pointer block"
                          >
                            Twitter
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex space-x-3 mt-8">
                      <Link
                        href="/contact-us"
                        className="flex-1 bg-[#e30613] hover:bg-[#ff1c2a] px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Contact Us
                      </Link>
                      <a
                        href="mailto:info@webtunix.com"
                        className="flex-1 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium text-center transition-colors shadow-md hover:shadow-lg"
                      >
                        Send an Email
                      </a>
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
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
