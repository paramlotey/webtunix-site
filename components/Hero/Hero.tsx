// Updated Hero.tsx - Main component with enhanced search functionality
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Herocarousel from "./Herocarousel";
import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";
import SearchBox from "./SearchBox";
import SuggestionCards from "./SuggestionCards";
import ChatModal from "./ChatModal";
import { ChatMessage } from "@/types";
import Title from "../Common/Title";

const Hero: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<ChatMessage[]>([]);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isChatOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  const handleChatChange = (value: string): void => {
    setChat(value);
    setSelectOpen(value.trim().length > 0);
  };

  const handleChatClose = (): void => {
    setIsChatOpen(false);
    setChatResponse([]);
    setChat("");
  };

  const initiateSearch = async (value?: string): Promise<void> => {
    const input = value ?? chat;
    if (!input.trim()) return;

    setIsChatOpen(true);
    setChat("");
    setSelectOpen(false);

    // Add user message
    setChatResponse((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: input }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader available");

      let aiMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") return;
            if (data === "[ERROR]") {
              setChatResponse((prev) => [
                ...prev,
                {
                  sender: "ai",
                  text: "Error occurred while processing your request.",
                },
              ]);
              return;
            }
            aiMessage += data;
            setChatResponse((prev) => {
              const last = prev[prev.length - 1];
              if (last?.sender === "ai") {
                return [
                  ...prev.slice(0, -1),
                  { sender: "ai", text: aiMessage },
                ];
              } else {
                return [...prev, { sender: "ai", text: aiMessage }];
              }
            });
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setChatResponse((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, there was an error processing your request. Please try again.",
        },
      ]);
    }
  };

  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] xl:min-h-[85vh]">
        <Navbar />
        <HeroBackground isHomepage={true} />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Designing smarter tomorrows with"
              gradheading="AI today!"
              description="Have tech questions? Our AI answer engine can help you find solutions faster than ever before.
"
            />
            <HeroButtons onAskNowClick={() => setIsChatOpen(true)} />
            <SearchBox
              chat={chat}
              selectOpen={selectOpen}
              onChatChange={handleChatChange}
              onSubmit={initiateSearch}
            />
            <SuggestionCards onSuggestionClick={initiateSearch} />
          </div>
        </div>

        <Herocarousel />
      </div>

      <ChatModal
        isOpen={isChatOpen}
        chat={chat}
        chatResponse={chatResponse}
        onClose={handleChatClose}
        onChatChange={setChat}
        onSubmit={initiateSearch}
      />
    </>
  );
};

export default Hero;
