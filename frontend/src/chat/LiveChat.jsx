import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot, User, Clock } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/chatbot";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat pagi ☀️";
    if (hour >= 11 && hour < 15) return "Selamat siang 🌤️";
    if (hour >= 15 && hour < 18) return "Selamat sore 🌇";
    return "Selamat malam 🌙";
  };

  useEffect(() => {
    if (!isOpen) return;

    if (!sessionId) {
      const newSession = `session_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;

      setSessionId(newSession);

      setMessages([
        {
          id: "ai_welcome",
          sender: "ai",
          text: `${getGreeting()}! 👋  
Saya adalah **Asisten AI Surya Technology Nasional**.  
Silakan tanyakan seputar layanan, produk, dan teknologi kami.`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(API_URL, {
        question: userMessage.text, // ✅ FIX UTAMA
        sessionId,
      });

      const aiReply =
        response.data?.reply ||
        response.data?.text ||
        "Baik, saya bantu jelaskan.";

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: "ai",
            text: aiReply,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    } catch (error) {
      console.error("CHAT ERROR:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_error_${Date.now()}`,
          sender: "ai",
          text:
            "⚠️ Maaf, sistem sedang sibuk. Silakan coba lagi dalam beberapa saat.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-20 right-5 w-96 bg-white border rounded-2xl shadow-2xl flex flex-col z-40"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span className="font-semibold text-sm">
                Asisten AI - Surya Teknologi
              </span>
            </div>
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 max-h-[60vh]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={10} />
                    {formatTime(msg.timestamp)}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-2">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="text-sm text-gray-400 mt-2">
                AI sedang mengetik…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="border-t p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tulis pertanyaan Anda…"
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-blue-600 text-white p-2 rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
      <ChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ChatWidget;
