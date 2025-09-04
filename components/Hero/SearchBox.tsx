import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search, Loader2 } from "lucide-react";
import { SearchSuggestion } from "@/types";

interface SearchBoxProps {
  chat: string;
  selectOpen: boolean;
  onChatChange: (value: string) => void;
  onSubmit: (value?: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  chat,
  selectOpen,
  onChatChange,
  onSubmit,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const debounce = useCallback(
    <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;

      const debounced = (...args: T) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };

      debounced.cancel = () => {
        clearTimeout(timeoutId);
      };

      return debounced;
    },
    []
  );

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchSuggestion = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => fetchSuggestions(query), 500),
    [debounce, fetchSuggestions]
  );

  useEffect(() => {
    if (chat.trim().length >= 3) {
      debouncedFetchSuggestions(chat);
    } else {
      debouncedFetchSuggestions.cancel?.();
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [chat, debouncedFetchSuggestions]);

  const handleInputChange = (value: string) => {
    onChatChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChatChange(suggestion);
    setShowSuggestions(false);
    onSubmit(suggestion);
  };

  const handleSubmit = () => {
    setShowSuggestions(false);
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-4 sm:mt-6 mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Please ask a question or initiate a search"
          className={`placeholder:text-white placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg pl-12 sm:pl-14 py-5 md:py-7 lg:py-8 text-sm sm:text-base md:text-lg focus-visible:ring-0 focus-visible:border-[#e3061583] text-white border-[#e3061583] !bg-[#e3061583] w-full ${
            (selectOpen && chat) || showSuggestions
              ? "!rounded-b-none"
              : "rounded-md"
          }`}
          value={chat}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <Image
            src="/Hero/input2.gif"
            alt="input"
            height={32}
            width={32}
            className="mix-blend-screen rounded-full sm:h-10 sm:w-10"
            unoptimized
          />
        </div>
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 sm:p-3"
          onClick={handleSubmit}
          disabled={isLoadingSuggestions}
        >
          {isLoadingSuggestions ? (
            <Loader2 size={18} className="text-white animate-spin" />
          ) : (
            <Search size={18} className="text-white" />
          )}
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 min-h-8 overflow-auto bg-[#b10a16] rounded-b-md shadow-xl z-30 border border-[#e30613]">
            <div
              className="max-h-48 overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 sm:p-3 text-white text-xs sm:text-sm hover:bg-black/20 cursor-pointer transition-colors duration-200 border-b border-[#e30613]/20 last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <Search
                      size={14}
                      className="text-white/70 mt-0.5 flex-shrink-0"
                    />
                    <span className="leading-relaxed">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isLoadingSuggestions && showSuggestions && (
          <div className="absolute left-0 right-0 min-h-8 overflow-auto bg-[#b10a16] rounded-b-md shadow-xl z-30 border border-[#e30613]">
            <div className="p-3 sm:p-4 flex items-center justify-center text-white">
              <Loader2 size={16} className="animate-spin mr-2" />
              <span className="text-xs sm:text-sm">Finding suggestions...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
