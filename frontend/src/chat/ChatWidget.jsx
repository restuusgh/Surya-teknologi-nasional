import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import LiveChat from "./LiveChat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 h-96 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-cyan-500 text-white flex justify-between items-center px-4 py-3">
              <p className="font-semibold">Live Chat</p>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Chat Component */}
            <LiveChat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
