import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-slate-900 text-slate-300 border-t border-slate-800 relative z-10"
    >
      {/* Bottom Footer */}
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-300 font-semibold">
        © {new Date().getFullYear()} <span className="text-blue-700">Surya Teknologi Nasional</span>. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
