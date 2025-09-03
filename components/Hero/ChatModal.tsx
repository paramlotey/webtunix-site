"use client";
import React, {
  useRef,
  useEffect,
  useCallback,
  memo,
  useLayoutEffect,
  useState,
} from "react";
import { Copy, Check, X } from "lucide-react";
import { ChatMessage } from "@/types";
import Image from "next/image";
import "highlight.js/styles/github-dark.css";
import { AnimatePresence, motion } from "framer-motion";
import MarkdownRenderer from "../Extra/MarkDownRender";
import { toast } from "sonner";

interface ChatModalProps {
  isOpen: boolean;
  chat: string;
  chatResponse: ChatMessage[];
  onClose: () => void;
  onChatChange: (value: string) => void;
  onSubmit: (value: string) => void;
  loading?: boolean;
}

const ChatMessages: React.FC<{
  chatResponse: ChatMessage[];
  loading: boolean;
}> = memo(({ chatResponse, loading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const msgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
    const timeoutId = setTimeout(scrollToBottom, chatResponse ? 100 : 50);
    return () => clearTimeout(timeoutId);
  }, [chatResponse, loading]);

  const handleCopy = async (index: number, text: string) => {
    try {
      const msgElement = msgRefs.current[index];
      if (!msgElement) return;

      const htmlContent = msgElement.innerHTML;

      // Plain fallback (for editors like VS Code)
      const plainText = text;

      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([plainText], { type: "text/plain" });

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);

      setCopiedIndex(index);
      toast.success("Copied with formatting!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Copy failed");
    }
  };

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
                ref={(el: HTMLDivElement | null) => {
                  msgRefs.current[idx] = el;
                }}
                className={`relative group max-w-md sm:max-w-xl md:max-w-6xl p-5 rounded-lg shadow ${
                  msg.sender === "user"
                    ? "bg-[#38131333] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-2 border border-white/10 text-gray-100"
                    : "bg-[#534f4f33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl p-2 border border-white/10 text-gray-100"
                }`}
              >
                {msg.sender === "bot" ? (
                  msg.streaming ? (
                    <pre className="whitespace-pre-wrap text-gray-200">
                      {msg.text}
                    </pre>
                  ) : (
                    <div className="prose prose-invert max-w-none break-words prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-red-400">
                      <MarkdownRenderer>{msg.text.trim()}</MarkdownRenderer>
                    </div>
                  )
                ) : (
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                )}

                <button
                  onClick={() => handleCopy(idx, msg.text)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-black/30 hover:bg-black/50 text-white"
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
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

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
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
        onChatChange("");
        if (inputRef.current) inputRef.current.value = ""; 
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-modal"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[500] flex flex-col"
          style={{ transformOrigin: "top center" }}
        >
          <div className="flex flex-col h-full w-full mx-auto p-4 sm:p-6 px-28">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-3 flex-shrink-0">
              <h2 className="text-white text-xl sm:text-2xl font-bold">
                AI Chat
              </h2>
              <button
                onClick={onClose}
                className="text-white text-2xl hover:scale-110 transition-transform duration-200"
                type="button"
              >
                <X />
              </button>
            </div>

            <ChatMessages chatResponse={chatResponse} loading={loading} />

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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
