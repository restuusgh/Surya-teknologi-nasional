import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Menu list
  const menuItems = [
    { name: "HOME", link: "#home", icon: "🏠" },
    { name: "BARANG KAMI", link: "#barangkami", icon: "📦" },
    { name: "TENTANG KAMI", link: "#produk", icon: "ℹ" },
    { name: "LAYANAN KAMI", link: "#services", icon: "🔧" },
    { name: "PORTOFOLIO", link: "#portfolio", icon: "💼" },
    { name: "KONTAK KAMI", link: "#contact", icon: "📞" },
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-blue-100 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-1 sm:gap-2 -ml-1 sm:-ml-2">
              <img
                src="logostn.png"
                alt="Logo STN"
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
              <span className="font-semibold text-indigo-800 text-sm sm:text-base lg:text-lg">
                <span className="hidden sm:inline">
                  Surya Teknologi Nasional
                </span>
              </span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="text-gray-800 hover:text-indigo-800 transition-colors duration-200 text-sm xl:text-base font-medium whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              className="hamburger-btn lg:hidden text-2xl sm:text-3xl focus:outline-none text-gray-800 hover:text-indigo-800 transition-colors duration-200 p-1 relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar dengan Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black lg:hidden"
              style={{ zIndex: 45 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="logostn.png"
                      alt="Logo STN"
                      className="h-10 w-auto bg-white rounded-lg p-1"
                    />
                    <div>
                      <h1 className="text-sm opacity-90 font-semibold">
                        Surya Teknologi Nasional
                      </h1>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors duration-200 p-1"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="py-4 flex-1 overflow-y-auto">
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-6 py-4 text-gray-800 transition-all duration-150"
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(59,130,246,0.12)", // bg-blue-100
                      color: "#4f46e5", // text-indigo-600
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                  >
                    <motion.span
                      className="text-xl"
                      whileHover={{ rotate: -8, scale: 1.15 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Divider */}
              <div className="mx-6 border-t border-gray-200"></div>

              {/* Contact Info */}
              <div className="p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📧</span> Hubungi Kami
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span>📞</span> (021) 123-4567
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✉</span> info@stn.co.id
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span> Jakarta, Indonesia
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-100 text-center">
                <p className="text-xs text-gray-500">
                  © 2024 Surya Teknologi Nasional
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;