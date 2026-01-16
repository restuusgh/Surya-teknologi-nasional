import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot, User, Clock } from "lucide-react";
import axios from "axios";

// URL Flowise Prediction Endpoint kamu
const API_URL = "http://localhost:5678/webhook/chatbot";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [inactiveTimer, setInactiveTimer] = useState(null);
  const messagesEndRef = useRef(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat pagi ☀️";
    if (hour >= 11 && hour < 15) return "Selamat siang 🌤️";
    if (hour >= 15 && hour < 18) return "Selamat sore 🌇";
    return "Selamat malam 🌙";
  };

  useEffect(() => {
    if (isOpen) initializeChat();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeChat = () => {
    if (sessionId) return;
    const newSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    setSessionId(newSession);

    const welcomeMessage = {
      id: "ai_1",
      sender: "ai",
      text: `${getGreeting()}! 👋 Saya Asisten AI dari **Surya Teknologi Nasional**. Saya siap membantu Anda seputar keamanan parkir, CCTV, dan sistem monitoring. Silakan ajukan pertanyaan Anda!`,
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    if (!isOpen) return;
    if (inactiveTimer) clearTimeout(inactiveTimer);

    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_end_${Date.now()}`,
          sender: "ai",
          text: "Terima kasih sudah berbicara dengan saya 😊. Jika Anda butuh bantuan lain, silakan buka chat ini lagi ya!",
          timestamp: new Date(),
        },
      ]);
    }, 3 * 60 * 1000);

    setInactiveTimer(timer);
    return () => clearTimeout(timer);
  }, [messages, isOpen]);

  const formatTime = (date) =>
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  // ✅ Kirim pesan ke Flowise
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(API_URL, {
        question: userMessage.text,
        sessionId: sessionId
      });

      const aiReply = response.data.text || "Terima kasih! Saya akan bantu sebisa saya.";

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { id: `ai_${Date.now()}`, sender: "ai", text: aiReply, timestamp: new Date() },
        ]);
      }, 600);

    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai_error_${Date.now()}`,
          sender: "ai",
          text: "⚠️ Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
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

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-gray-400 text-sm">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
      <span>AI sedang mengetik...</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-5 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-40"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <h4 className="font-semibold text-sm">Asisten AI - Surya Teknologi</h4>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2">
                    <Bot size={14} />
                  </div>
                )}

                <div className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                }`}>
                  {msg.text}
                  <div className="text-xs mt-1 text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> {formatTime(msg.timestamp)}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full ml-2">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-white p-3 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Send size={18} />
            </motion.button>
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
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
      <ChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ChatWidget;
