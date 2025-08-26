"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type FAQ = {
  id: string;
  question: string;
  answer: string;
  status: boolean;
};
const Faq = () => {
  const [faq, setFaq] = useState<FAQ[]>([]);
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await (await fetch("/api/faq")).json();
        setFaq(response.allFaq.filter((item: FAQ) => item.status === true));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFAQ();
  }, []);

  const midpoint = Math.ceil(faq.length / 2);
  const leftColumnFaq = faq.slice(0, midpoint);
  const rightColumnFaq = faq.slice(midpoint);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto">
        <h2 className="mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl my-8 sm:my-10 font-semibold leading-snug sm:leading-tight capitalize">
          Frequently asked questions about our{" "}
          <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
            AI services
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            {leftColumnFaq.map(
              (item: { question: string; answer: string }, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  className="bg-white/5 rounded-lg shadow-sm"
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg transition-colors duration-300 cursor-pointer select-none">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </div>

          <div className="space-y-4">
            {rightColumnFaq.map(
              (item: { question: string; answer: string }, index) => (
                <Accordion
                  key={index + midpoint}
                  type="single"
                  collapsible
                  className="bg-white/5 rounded-lg shadow-sm"
                >
                  <AccordionItem value={`item-${index + midpoint}`}>
                    <AccordionTrigger className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg transition-colors duration-300 cursor-pointer select-none">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
