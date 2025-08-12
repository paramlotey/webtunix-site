import { Headset, Layers } from "lucide-react";
import Image from "next/image";
import React from "react";

const OurServices = () => {
  return (
    <section className="my-16">
      <div className="flex justify-center">
        <h3 className="text-sm sm:text-base uppercase bg-white/10 rounded-full px-5 py-2 tracking-widest">
          <span className="text-[#e30613]">{"\u2726"}</span> Our Services{" "}
          <span className="text-[#e30613]">{"\u2726"}</span>
        </h3>
      </div>

      <h2 className="mx-auto text-center text-3xl sm:text-4xl lg:text-5xl max-w-4xl my-8 font-semibold">
        Empowering organizations with intelligent{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
          neural systems
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-10 flex flex-col justify-between border border-white/10 ">
          <div>
            <h4 className="text-xl font-semibold mb-2">
              Custom Neural Network Development
            </h4>
            <p className="text-gray-500 mb-3 text-base">
              Tailored model architectures for classification, regression,
              prediction.
            </p>
            <ul className="space-y-1 text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Built for your unique
                AI needs.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Optimized for speed
                and accuracy.
              </li>
            </ul>
          </div>
          <div className="rounded-xl mt-10 overflow-hidden relative group">
            <Image
              src="/Service/service-1.jpg"
              alt="service 1"
              width={400}
              height={400}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 after:content-[''] after:absolute after:w-[200%] after:h-0 after:top-1/2 after:left-1/2 after:bg-[#ffffff4d] after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:z-10 group-hover:after:h-full group-hover:after:bg-transparent group-hover:after:transition-all group-hover:after:duration-700" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-10 border border-white/10 relative overflow-hidden flex-1">
            <div className="absolute bottom-3 right-3 opacity-10">
              <Layers size={64} />
            </div>
            <h4 className="text-xl font-semibold mb-2">Deep Learning Model</h4>
            <p className="text-gray-500 mb-4">
              Using large datasets to train high-performance models.
            </p>
            <ul className="space-y-1 text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Delivers high-accuracy
                predictions.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Learns deep data
                patterns.
              </li>
            </ul>
          </div>

          <div className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-10 border border-white/10 relative overflow-hidden flex-1">
            <div className="absolute bottom-3 right-3 opacity-10">
              <Layers size={64} />
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Strategy for AI Adoption
            </h4>
            <p className="text-gray-500 mb-4">
              Expert guidance on implementing neural networks into business.
            </p>
            <ul className="space-y-1 text-base text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Aligns AI with your
                business goals.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e30613]">●</span> Smart, scalable AI
                planning.
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/5 bg-[url('/Service/service-2.jpg')] bg-center bg-cover bg-no-repeat flex flex-col">
          <div className="flex-1"></div>
          <div className="p-10 flex flex-col justify-end gap-2 items-start">
            <Headset size={36} className="mb-3" />
            <h4 className="text-xl font-semibold mb-2">
              Get in Touch with Our AI Experts
            </h4>
            <p className="text-gray-500 mb-5 text-base">
              Whether you're looking to build a custom neural network, explore
              deep learning.
            </p>
            <button className="bg-gradient-to-r from-[#e30613] to-[#b10510] text-white rounded-full px-6 py-3 text-base font-medium transform transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
