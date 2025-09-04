// SuggestionCards.tsx
import React from "react";

interface SuggestionCardsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({
  onSuggestionClick,
}) => {
  const suggestions = [
    "What services does Webtunix offer in AI Computing?",
    "Generative AI Trends in 2025",
    "More Questions",
  ];

  return (
    <div className="hidden min-[425px]:grid min-[425px]:grid-cols-3 gap-6 mt-4 max-w-2xl mx-auto">
      {suggestions.map((title, i) => (
        <div
          onClick={() => onSuggestionClick(title)}
          key={i}
          className="group flex items-center justify-between px-4 py-2 rounded bg-gradient-to-r from-[#e30613] to-[#e3061583] text-white font-medium shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <p className="text-sm sm:text-base leading-snug text-left">{title}</p>
        </div>
      ))}
    </div>
  );
};

export default SuggestionCards;
