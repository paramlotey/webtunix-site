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
import Title from "../Extra/Title";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const [chat, setChat] = useState<string>("");
  const [modalChat, setModalChat] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<ChatMessage[]>([]);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isChatOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  useEffect(()=>{
    (async () => {
      try {
        await fetch('/api/cookies')   
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  const handleHomeChatChange = (value: string): void => {
    setChat(value);
    setSelectOpen(value.trim().length > 0);
  };

  const handleChatClose = (): void => {
    setIsChatOpen(false);
    setChatResponse([]);
    setChat("");
    setModalChat("");
    setLoading(false);
  };

  const initiateSearch = async (value?: string): Promise<void> => {
    const input = (value ?? (isChatOpen ? modalChat : chat)).trim();
    if (!input) return;

    setIsChatOpen(true);
    setChat("");
    setModalChat("");
    setSelectOpen(false);

    setChatResponse((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

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
      setLoading(false)
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);

          if (data === "[DONE]") {
            setChatResponse((prev) => {
              const last = prev[prev.length - 1];
              if (last?.sender === "bot") {
                return [...prev.slice(0, -1), { ...last, streaming: false }];
              }
              return prev;
            });
            setLoading(false);
            return;
          }

          if (data === "[ERROR]") {
            setChatResponse((prev) => [
              ...prev,
              {
                sender: "bot",
                text: "Error occurred while processing your request.",
                streaming: false,
              },
            ]);
            setLoading(false);
            return;
          }

          // each data is a little text chunk
          aiMessage += JSON.parse(data);

          setChatResponse((prev) => {
            const last = prev[prev.length - 1];
            if (last?.sender === "bot") {
              return [
                ...prev.slice(0, -1),
                { sender: "bot", text: aiMessage, streaming: true },
              ];
            }
            return [
              ...prev,
              { sender: "bot", text: aiMessage, streaming: true },
            ];
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setChatResponse((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, there was an error processing your request. Please try again.",
          streaming: false,
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] xl:min-h-[85vh]">
        <Navbar />
        <HeroBackground isHomepage={true} />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-10 px-4 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl">
            <div className="flex gap-0 flex-wrap">
              <div className="flex-1 text-left">
                <h5 className="text-xs sm:text-sm md:text-base uppercase tracking-widest">
                  <span className="text-[#e30613] mr-2">{"\u2726"}</span>
                  WELCOME TO WEBTUNIX AI
                  <span className="text-[#e30613] ml-2">{"\u2726"}</span>
                </h5>
                <Title
                  heading="Designing smarter tomorrows with"
                  gradheading="AI today!"
                />
                <HeroButtons
                  onAskNowClick={() => {
                    setIsChatOpen(true);
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="mt-4 sm:mt-6 text-[#A7AABB] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed capitalize">
                  Have tech questions? Our AI answer engine can help you find
                  solutions faster than ever before.
                </p>
                <SearchBox
                  chat={chat}
                  selectOpen={selectOpen}
                  onChatChange={handleHomeChatChange}
                  onSubmit={initiateSearch}
                />
                <SuggestionCards onSuggestionClick={initiateSearch} />
              </div>
            </div>
          </div>
        </div>

        <Herocarousel />
      </div>

      <ChatModal
        isOpen={isChatOpen}
        chat={modalChat}
        chatResponse={chatResponse}
        onClose={handleChatClose}
        onChatChange={setModalChat}
        onSubmit={initiateSearch}
        loading={loading}
      />
    </>
  );
};

export default Hero;
