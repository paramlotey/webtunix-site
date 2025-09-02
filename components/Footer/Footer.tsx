import React from "react";
import { ArrowRight, Facebook, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-gray-300 select-none">
      {/* Top CTA Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#e30613] to-[#e3061583] px-8 py-10 md:px-16 md:py-14 gap-6">
        {/* Branding */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white border-r md:border-r border-white/70 pr-0 md:pr-6">
            WebTunix AI
          </h2>
          <h4 className="text-lg md:text-xl font-semibold text-white/90 text-center md:text-left">
            Defining New Standards for AI{" "}
            <sup className="text-base font-normal">TM</sup>
          </h4>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={"/contact-us"}>
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10 transition duration-300">
              Contact Us <ArrowRight size={20} />
            </button>
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#e30613] hover:bg-white/80 transition duration-300">
            Subscribe <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-6 gap-10 border-t border-white/10">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 capitalize">
            Webtunix AI is redefining industries with Artificial Intelligence
            solutions. We specialize in AI, ML, Web & Mobile development to
            deliver innovation that drives growth.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com/webtunix"
              target="_blank"
              className="hover:text-white"
              aria-label="Visit Webtunix on Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://linkedin.com/company/webtunix"
              target="_blank"
              className="hover:text-white"
              aria-label="Visit Webtunix on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/webtunix"
              target="_blank"
              className="hover:text-white"
              aria-label="Visit Webtunix on Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="hover:text-white cursor-pointer">
                AI Consulting
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Machine Learning
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Web Development
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Mobile Apps
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Data Science
              </span>
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Industries</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="hover:text-white cursor-pointer">
                Healthcare
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">Finance</span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Retail & E-commerce
              </span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">Education</span>
            </li>
            <li>
              <span className="hover:text-white cursor-pointer">
                Manufacturing
              </span>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-white">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/whitepapers" className="hover:text-white">
                Whitepapers
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white">
                News & Updates
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-4 text-sm">
            <li>
              <p className="font-medium text-gray-300">For SEO/PPC Inquiry</p>
              <p className="flex items-center gap-2 hover:text-white cursor-pointer">
                <span>🇺🇸</span> +1 323 503 2827
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-300">
                For Web/Mobile Development
              </p>
              <p className="flex items-center gap-2 hover:text-white cursor-pointer">
                <span>🇺🇸</span> +1 323 503 2827
              </p>
              <span className="text-xs text-gray-500">
                (If we don’t pick up, drop inquiry.)
              </span>
            </li>
            <li>
              <p className="font-medium text-gray-300">For HR Inquiry</p>
              <p className="flex items-center gap-2 hover:text-white cursor-pointer">
                <span>🇮🇳</span> +91 0172 4666470
              </p>
              <span className="text-xs text-gray-500">
                (If we don’t pick up, drop inquiry.)
              </span>
            </li>
            <li className="flex items-center gap-3 mt-4">
              <Mail size={18} className="text-[#e30613]" />
              <span>info@webtunix.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="px-8 md:px-16 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Subscribe to our Newsletter
        </h3>
        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-80 px-4 py-3 rounded-l-lg bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none focus:border-[#e30613]"
          />
          <button className="px-6 py-3 rounded-r-lg bg-[#e30613] text-white hover:bg-[#ff1c2a] transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 md:px-16 py-6 border-t border-white/10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Webtunix AI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
