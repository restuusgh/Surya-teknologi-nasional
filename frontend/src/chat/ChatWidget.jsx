import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import LiveChat from "./LiveChat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 ">
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
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* LiveChat Component - Pass isOpen and onClose props */}
      <LiveChat 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
};

export default ChatWidget;