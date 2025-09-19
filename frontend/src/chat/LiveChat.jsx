import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Clock, User, Headphones, MessageCircle, Paperclip, Image as ImageIcon } from "lucide-react";

// LiveChat Component
const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "admin",
      text: "👋 Halo! Selamat datang di Surya Teknologi Nasional.",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "read"
    },
    {
      id: "2", 
      sender: "admin",
      text: "Saya Andi dari tim customer service. Ada yang bisa kami bantu hari ini?",
      timestamp: new Date(Date.now() - 4 * 60000),
      status: "read"
    },
    {
      id: "3",
      sender: "admin", 
      text: "Kami siap membantu Anda dengan:",
      timestamp: new Date(Date.now() - 3 * 60000),
      status: "read"
    },
    {
      id: "4",
      sender: "admin",
      text: "• Konsultasi produk teknologi\n• Informasi harga dan paket\n• Technical support\n• Demo produk",
      timestamp: new Date(Date.now() - 3 * 60000),
      status: "read"
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const handleSend = () => {
    if (input.trim() === "" && !selectedImage) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      image: selectedImage,
      timestamp: new Date(),
      status: "sent"
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setSelectedImage(null);
    setShowImagePreview(false);
    setIsTyping(true);

    // Simulasi admin typing dan response
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "read" } 
            : msg
        )
      );
    }, 1000);

    // Generate admin response based on user message
    setTimeout(() => {
      setIsTyping(false);
      let adminResponse = "Terima kasih atas pertanyaannya. Tim kami akan segera membantu Anda.";
      
      if (selectedImage) {
        adminResponse = "Terima kasih sudah mengirim gambar. Saya akan review dan tim kami akan segera memberikan solusi terbaik untuk Anda! 📸";
      } else {
        const userMsg = input.toLowerCase();
        if (userMsg.includes("harga") || userMsg.includes("biaya")) {
          adminResponse = "Untuk informasi harga, saya akan hubungkan Anda dengan tim sales kami. Mohon tunggu sebentar ya 💼";
        } else if (userMsg.includes("demo") || userMsg.includes("presentasi")) {
          adminResponse = "Kami bisa arrange demo produk untuk Anda. Kapan waktu yang cocok? 📊";
        } else if (userMsg.includes("technical") || userMsg.includes("support")) {
          adminResponse = "Saya akan hubungkan dengan tim technical support kami. Bisa dijelaskan issue yang Anda hadapi? 🔧";
        } else if (userMsg.includes("terima kasih") || userMsg.includes("thanks")) {
          adminResponse = "Sama-sama! Senang bisa membantu. Ada hal lain yang ingin ditanyakan? 😊";
        }
      }

      const adminMsg = {
        id: Date.now().toString(),
        sender: "admin",
        text: adminResponse,
        timestamp: new Date(),
        status: "read"
      };

      setMessages(prev => [...prev, adminMsg]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowImagePreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setShowImagePreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-start justify-start mb-3"
    >
      <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center mr-2 text-xs">
        <Headphones size={12} />
      </div>
      <div className="bg-gray-200 p-3 rounded-lg rounded-bl-none">
        <div className="flex space-x-1">
          <motion.div 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
          />
          <motion.div 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
          />
          <motion.div 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="fixed bottom-20 right-5 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-40 flex flex-col max-h-[600px] border border-gray-100"
          style={{ zIndex: 40 }} // Lower z-index than navbar
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Headphones size={16} />
                </div>
                {adminOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-sm">Live Chat Support</h4>
                <p className="text-xs opacity-90">
                  {adminOnline ? "Admin online" : "Admin offline"}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[300px]">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "admin" && (
                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center mr-2 text-xs flex-shrink-0">
                      <Headphones size={12} />
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                      }`}
                    >
                      {msg.image && (
                        <div className="mb-2">
                          <img 
                            src={msg.image} 
                            alt="Shared image" 
                            className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ maxHeight: '200px' }}
                            onClick={() => window.open(msg.image, '_blank')}
                          />
                        </div>
                      )}
                      {msg.text && (
                        <div className="whitespace-pre-line">{msg.text}</div>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 space-x-1 text-xs text-gray-500 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <Clock size={10} />
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.sender === "user" && msg.status && (
                        <span className={`ml-1 ${
                          msg.status === "read" ? "text-blue-500" : 
                          msg.status === "delivered" ? "text-gray-400" : "text-gray-300"
                        }`}>
                          {msg.status === "read" ? "✓✓" : msg.status === "delivered" ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center ml-2 text-xs flex-shrink-0">
                      <User size={12} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            {/* Image Preview */}
            <AnimatePresence>
              {showImagePreview && selectedImage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Gambar siap dikirim</p>
                        <p className="text-xs text-gray-500">Klik kirim untuk mengirimkan gambar</p>
                      </div>
                    </div>
                    <button
                      onClick={removeSelectedImage}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end space-x-2">
              {/* Attachment Button */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!adminOnline}
                  className="p-2 text-gray-500 hover:text-cyan-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Kirim gambar"
                >
                  <Paperclip size={18} />
                </motion.button>
              </div>

              {/* Message Input */}
              <div className="flex-1 flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2 border border-gray-200 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={selectedImage ? "Tambahkan pesan (opsional)..." : "Ketik pesan Anda..."}
                  className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                  disabled={!adminOnline}
                />
              </div>

              {/* Send Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={(!input.trim() && !selectedImage) || !adminOnline}
                className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedImage || input.trim() 
                    ? "text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50" 
                    : "text-gray-400"
                }`}
              >
                {selectedImage && !input.trim() ? (
                  <ImageIcon size={18} />
                ) : (
                  <Send size={18} />
                )}
              </motion.button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Response time rata-rata: 2-3 menit
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ChatWidget Component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-5 right-5 z-30"> {/* Lower z-index */}
        {/* Floating button */}
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: [
                "0 4px 20px rgba(6, 182, 212, 0.4)",
                "0 8px 25px rgba(6, 182, 212, 0.6)",
                "0 4px 20px rgba(6, 182, 212, 0.4)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              default: { duration: 0.3 }
            }}
            style={{ zIndex: 30 }} // Ensure button has lower z-index
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}

        {/* LiveChat Component */}
        <LiveChat 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
    </>
  );
};

export default ChatWidget;