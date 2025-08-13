
// ChatModal.tsx
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/types";

interface ChatModalProps {
  isOpen: boolean;
  chat: string;
  chatResponse: ChatMessage[];
  onClose: () => void;
  onChatChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  chat,
  chatResponse,
  onClose,
  onChatChange,
  onSubmit,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(chat);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 transform transition-all duration-500 ease-out ${
        isOpen
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-0 opacity-0 pointer-events-none"
      }`}
      style={{ transformOrigin: "top center" }}
    >
      <div className="flex flex-col h-full max-w-7xl mx-auto p-4 sm:p-6" style={{scrollbarWidth:"none"}}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h2 className="text-white text-xl sm:text-2xl font-bold">AI Chat</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:scale-110 transition-transform"
          >
            <X />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4" style={{scrollbarWidth:"none"}}>
          {chatResponse.length > 0 ? (
            chatResponse.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md sm:max-w-xl md:max-w-4xl px-4 py-2 rounded-lg shadow prose prose-invert ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#e30613] to-[#e3061583] text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No messages yet.</p>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-700 pt-3"
        >
          <input
            type="text"
            value={chat}
            onChange={(e) => onChatChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#e30613] to-[#e3061583] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
