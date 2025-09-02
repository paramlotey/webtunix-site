import React from "react";
import { Button } from "../ui/button";

const Connect = () => {
  return (
    <div className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-xl shadow-lg border border-white/10 p-6 hover:shadow-red-500/20 transition-all duration-300">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">
          Connect With Us
        </h4>
        <p className="text-sm text-white/70 capitalize">
          Get in touch and let’s start the conversation today
        </p>
      </div>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/40 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/40 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/40 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
        />
        <textarea
          placeholder="Your Message..."
          className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/40 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
        ></textarea>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="newsletter-agreement"
            className="mt-1 w-4 h-4 text-red-600 bg-black border-white/10 rounded focus:ring-red-500"
          />
          <label
            htmlFor="newsletter-agreement"
            className="text-sm text-white/80 leading-relaxed"
          >
            I agree to receive updates and communication
          </label>
        </div>
        <Button className="w-full bg-gradient-to-r from-[#e30613] to-[#e3061583] hover:from-[#e3061583] hover:to-[#e30613] text-white text-base transition-all duration-300 font-medium py-3 px-4 rounded-lg shadow-lg">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Connect;
