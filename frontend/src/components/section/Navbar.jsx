import React, { useState, useEffect } from "react";
import { Menu, X, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Menu list - ubah link menjadi path
  const menuItems = [
    { name: "HOME", path: "/", icon: "🏠" },
    { name: "BARANG KAMI", path: "/barangkami", icon: "📦" },
    { name: "TENTANG KAMI", path: "/about", icon: "ℹ" },
    { name: "LAYANAN KAMI", path: "/services", icon: "🔧" },
    { name: "PORTOFOLIO", path: "/portfolio", icon: "💼" },
    { name: "KONTAK KAMI", path: "/contact", icon: "📞" },
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

  // Tutup menu ketika navigasi terjadi
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 shadow-2xl"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              i % 3 === 0 ? 'bg-cyan-400/30' :
              i % 3 === 1 ? 'bg-blue-500/30' :
              'bg-emerald-400/30'
            } rounded-full`}
            style={{
              left: `${10 + (i * 75) % 80}%`,
              top: `${20 + (i * 60) % 60}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <img src="logostn.png"
                 alt="" 
                 className="w-10 h-10 object-contain"/>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg sm:text-xl">
                  Surya Teknologi Nasional
                </span>
                <span className="text-xs text-slate-400 hidden sm:block">
                  Teknologi Keamanan Masa Depan
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`relative text-slate-300 hover:text-cyan-400 transition-all duration-300 text-sm xl:text-base font-medium whitespace-nowrap group ${
                    location.pathname === item.path ? "text-cyan-400" : ""
                  }`}
                >
                  {item.name}
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Hamburger */}
            <motion.button
              className="lg:hidden text-2xl sm:text-3xl focus:outline-none text-slate-300 hover:text-cyan-400 transition-colors duration-300 p-2 relative z-50 rounded-lg hover:bg-slate-800/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Sidebar dengan Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
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
              className="fixed top-0 left-0 h-full w-80 bg-slate-900 shadow-2xl z-50 flex flex-col border-r border-slate-800"
            >
              {/* Sidebar particles background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 ${
                      i % 4 === 0 ? 'bg-cyan-400/20' :
                      i % 4 === 1 ? 'bg-blue-500/20' :
                      i % 4 === 2 ? 'bg-emerald-400/20' :
                      'bg-purple-400/20'
                    } rounded-sm`}
                    style={{
                      left: `${5 + (i * 67) % 90}%`,
                      top: `${10 + (i * 43) % 80}%`,
                    }}
                    animate={{
                      y: [-15, 15, -15],
                      x: [-10, 10, -10],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>

              {/* Sidebar Header */}
              <div className="relative z-10 bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <img src="logostn.png" 
                      alt="" 
                      className="w-10 h-10 object-contain"/>
                    <div>
                      <h1 className="text-lg font-bold text-white">
                        Surya Teknelogi Nasional
                      </h1>
                      <p className="text-xs text-slate-400">
                        Teknologi Keamanan Masa Depan
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-800/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="relative z-10 py-4 flex-1 overflow-y-auto">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-6 py-4 text-slate-300 transition-all duration-300 relative group ${
                        location.pathname === item.path 
                          ? "bg-slate-800/80 text-cyan-400 border-r-2 border-cyan-400" 
                          : "hover:bg-slate-800/50 hover:text-cyan-300"
                      }`}
                    >
                      <span className="text-xl filter grayscale group-hover:filter-none transition-all duration-300">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Active indicator */}
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"
                          layoutId="sidebarActive"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div className="relative z-10 mx-6 border-t border-slate-700"></div>

              {/* Contact Info */}
              <div className="relative z-10 p-6 bg-slate-800/50 backdrop-blur-sm">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-cyan-400">📧</span> Hubungi Kami
                </h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200">
                    <span className="text-blue-400">📞</span> (021) 123-4567
                  </p>
                  <p className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200">
                    <span className="text-emerald-400">✉</span> info@autoparkpro.id
                  </p>
                  <p className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200">
                    <span className="text-purple-400">📍</span> Jakarta, Indonesia
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 p-4 bg-slate-800 text-center border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  © 2024 AutoPark Pro - Parkir Otomatis Masa Depan
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