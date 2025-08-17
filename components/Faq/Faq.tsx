import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "What services does your AI agency offer?",
    answer:
      "We provide end-to-end AI solutions including strategy, data assessment, custom AI development, and ongoing optimization and support.",
  },
  {
    question: "Do I need a large amount of data to use AI?",
    answer:
      "Not necessarily. While more data can improve AI performance, we also work with small or medium datasets by using techniques like transfer learning or synthetic data.",
  },
  {
    question: "How long does it take to develop an AI solution?",
    answer:
      "Development timelines vary based on project complexity but typically range from a few weeks for smaller projects to several months for full-scale implementations.",
  },
  {
    question: "Can AI solutions integrate with my existing systems?",
    answer:
      "Yes, we design AI solutions to seamlessly integrate with your current software, databases, and workflows.",
  },
  {
    question: "Is my data secure when working with your agency?",
    answer:
      "Absolutely. We follow strict data security protocols to ensure your data remains confidential and protected at all times.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have experience across various industries including healthcare, finance, retail, manufacturing, and more.",
  },
  {
    question: "Will AI replace my employees?",
    answer:
      "AI is designed to augment human capabilities, automate repetitive tasks, and enable your team to focus on higher-value activities.",
  },
  {
    question: "What kind of AI technologies do you use?",
    answer:
      "We leverage machine learning, natural language processing, computer vision, and other advanced AI technologies tailored to your needs.",
  },
  {
    question: "Do I need to have technical expertise to work with you?",
    answer:
      "No technical background is required. We guide you through every step and deliver user-friendly AI solutions.",
  },
  {
    question: "Can you help improve my existing AI models?",
    answer:
      "Yes, we offer optimization and support services to enhance the performance and scalability of your current AI solutions.",
  },
  {
    question: "How do you measure the success of an AI project?",
    answer:
      "Success is measured by predefined KPIs such as accuracy, efficiency improvements, cost savings, and business impact.",
  },
  {
    question: "What if my data is unstructured or messy?",
    answer:
      "We handle data cleaning and preprocessing to prepare unstructured or incomplete data for effective AI modeling.",
  },
  {
    question: "Do you provide post-deployment support?",
    answer:
      "Yes, we offer ongoing monitoring, maintenance, and updates to ensure your AI solutions continue to perform well.",
  },
  {
    question: "Can AI solutions be customized for my unique business needs?",
    answer:
      "Absolutely, all our AI models and solutions are tailored specifically to your goals and challenges.",
  },
  {
    question: "What is the typical cost of an AI project?",
    answer:
      "Costs vary based on scope and complexity; we provide detailed proposals after understanding your requirements.",
  },
  {
    question: "Will AI help me make better decisions?",
    answer:
      "Yes, AI can provide actionable insights and predictions that improve decision-making processes.",
  },
  {
    question: "How do you ensure AI ethics and fairness?",
    answer:
      "We implement best practices to avoid bias, ensure transparency, and maintain ethical standards in all AI solutions.",
  },
  {
    question: "Can you assist with AI strategy consulting?",
    answer:
      "Yes, we help you identify high-impact AI opportunities and develop a clear roadmap aligned with your business objectives.",
  },
  {
    question: "Do you offer training for my team on using AI solutions?",
    answer:
      "Yes, we provide comprehensive training and documentation to help your team get the most out of the AI tools.",
  },
  {
    question: "What types of businesses benefit most from AI?",
    answer:
      "Businesses of all sizes and industries can benefit, especially those looking to automate processes, gain insights, or enhance customer experiences.",
  },
];

const Faq = () => {
  const midpoint = Math.ceil(faq.length / 2);
  const leftColumnFaq = faq.slice(0, midpoint);
  const rightColumnFaq = faq.slice(midpoint);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto">
        {/* Section Heading */}
        <h2 className="mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl my-8 sm:my-10 font-semibold leading-snug sm:leading-tight">
          Frequently asked questions about our{" "}
          <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent hover:from-[#e3061583] hover:to-[#e30613] transition-all duration-500 cursor-default">
            AI services
          </span>
        </h2>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnFaq.map((item, index) => (
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
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnFaq.map((item, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Faq;
