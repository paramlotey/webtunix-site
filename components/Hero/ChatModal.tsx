"use client";
import React, { useRef, useEffect, useCallback, memo } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/types";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface ChatModalProps {
  isOpen: boolean;
  chat: string; // kept for compatibility, but not used for input binding
  chatResponse: ChatMessage[];
  onClose: () => void;
  onChatChange: (value: string) => void;
  onSubmit: (value: string) => void;
  loading?: boolean;
}

/* ---------------------- */
/* Messages Component     */
/* ---------------------- */
const ChatMessages: React.FC<{
  chatResponse: ChatMessage[];
  loading: boolean;
}> = memo(({ chatResponse, loading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current && chatResponse.length > 0) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse.length]);

  return (
    <div
      className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0"
      style={{ scrollbarWidth: "none" }}
    >
      {chatResponse.length > 0 ? (
        <>
          {chatResponse.map((msg, idx) => (
            <div
              key={`${idx}-${msg.sender}-${msg.text.slice(0, 20)}`}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md sm:max-w-xl md:max-w-5xl px-4 py-2 rounded-lg shadow ${
                  msg.sender === "user"
                    ? "bg-[#38131333] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-2 border border-white/10 relative overflow-hidden text-gray-100"
                    : "bg-[#534f4f33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-2 border border-white/10 relative overflow-hidden text-gray-100"
                }`}
              >
                {msg.sender === "bot" ? (
                  msg.streaming ? (
                    <pre className="whitespace-pre-wrap text-gray-200">
                      {msg.text}
                    </pre>
                  ) : (
                    <div className="prose prose-invert max-w-none break-words prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-red-400">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {msg.text.trim()}
                      </ReactMarkdown>
                    </div>
                  )
                ) : (
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center">
              <Image
                src="/Hero/input2.gif"
                alt="Loading"
                height={200}
                width={200}
                className="mix-blend-screen rounded-full"
                unoptimized
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-center">
            No messages yet. Start a conversation!
          </p>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
});
ChatMessages.displayName = "ChatMessages";

/* ---------------------- */
/* Modal Component        */
/* ---------------------- */
const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  chat, // not used for input binding anymore
  chatResponse,
  onClose,
  onChatChange,
  onSubmit,
  loading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const value = inputRef.current?.value.trim() || "";
      if (value) {
        onSubmit(value);
        onChatChange(""); // sync state externally
        if (inputRef.current) inputRef.current.value = ""; // clear field
      }
    },
    [onSubmit, onChatChange]
  );

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 transform transition-all duration-500 ease-out scale-100 opacity-100"
      style={{ transformOrigin: "top center" }}
    >
      <div
        className="flex flex-col h-full w-full mx-auto p-4 sm:p-6 px-28"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 flex-shrink-0">
          <h2 className="text-white text-xl sm:text-2xl font-bold">AI Chat</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:scale-110 transition-transform duration-200"
            type="button"
          >
            <X />
          </button>
        </div>

        {/* Chat Messages (isolated for performance) */}
        <ChatMessages chatResponse={chatResponse} loading={loading} />

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-700 pt-3 flex-shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e30613] transition-all duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#e30613] to-[#e3061583] text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
