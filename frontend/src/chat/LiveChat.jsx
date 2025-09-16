// src/components/chat/LiveChat.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "👋 Halo! Selamat datang di Surya Teknologi Nasional." },
    { sender: "admin", text: "Ada yang bisa kami bantu hari ini?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // Tambah pesan user
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulasi balasan admin
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "admin", text: "Baik, kami catat dulu ya 👍" },
      ]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-5 w-80 bg-white shadow-xl rounded-xl overflow-hidden z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-cyan-500 text-white px-4 py-2">
            <h4 className="font-semibold">💬 Live Chat</h4>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "admin" && (
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center mr-2 text-sm">
                    A
                  </div>
                )}
                <div
                  className={`p-2 rounded-lg max-w-[70%] text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center ml-2 text-sm">
                    U
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 p-2 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="px-3 text-cyan-600 hover:text-cyan-800"
            >
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveChat;
