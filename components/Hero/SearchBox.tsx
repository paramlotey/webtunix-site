// SearchBox.tsx
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

  // Debounce function with proper typing
  const debounce = useCallback(<T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Function to fetch suggestions from backend
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => fetchSuggestions(query), 500),
    [debounce, fetchSuggestions]
  );

  // Effect to fetch suggestions when chat changes
  useEffect(() => {
    if (chat.trim().length >= 3) {
      debouncedFetchSuggestions(chat);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [chat, debouncedFetchSuggestions]);

  const handleInputChange = (value: string) => {
    onChatChange(value);
    // Show/hide the original selectOpen dropdown based on value length
    // but suggestions will be controlled separately
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
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-4 sm:mt-6 mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Please ask a question or initiate a search"
          className={`placeholder:text-white pl-12 sm:pl-14 py-3 sm:py-6 focus-visible:ring-0 focus-visible:border-[#e3061583] text-white border-[#e3061583] !bg-[#e3061583] w-full ${
            (selectOpen && chat) || showSuggestions ? "!rounded-b-none" : ""
          }`}
          value={chat}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <Image
            src="/Hero/input2.gif"
            alt="input"
            height={40}
            width={40}
            className="mix-blend-screen rounded-full"
            unoptimized
          />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-2"
          onClick={handleSubmit}
          disabled={isLoadingSuggestions}
        >
          {isLoadingSuggestions ? (
            <Loader2 size={18} className="text-white animate-spin" />
          ) : (
            <Search size={18} className="text-white" />
          )}
        </button>

        {/* AI-generated suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 min-h-8 overflow-auto bg-[#b10a16] rounded-b-md shadow-xl z-30 border border-[#e30613]">
            <div className="max-h-48 overflow-y-auto" style={{scrollbarWidth:"none"}}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-3 text-white text-sm hover:bg-black/20 cursor-pointer transition-colors duration-200 border-b border-[#e30613]/20 last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <Search size={14} className="text-white/70 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading state for suggestions */}
        {isLoadingSuggestions && showSuggestions && (
          <div className="absolute left-0 right-0 min-h-8 overflow-auto bg-[#b10a16] rounded-b-md shadow-xl z-30 border border-[#e30613]">
            <div className="p-4 flex items-center justify-center text-white">
              <Loader2 size={16} className="animate-spin mr-2" />
              <span className="text-sm">Finding suggestions...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;