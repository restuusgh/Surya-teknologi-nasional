import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaInfoCircle,
  FaTools,
  FaBriefcase,
  FaPhone,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "HOME", link: "/", icon: <FaHome /> },
    { name: "BARANG", link: "/barangkami", icon: <FaBox /> },
    { name: "TENTANG", link: "/about", icon: <FaInfoCircle /> },
    {
      name: "LAYANAN",
      link: "/services",
      icon: <FaTools />,
      submenu: [
        { name: "Semua Layanan", link: "/services" },
        { name: "Perangkat Lunak", link: "/layanan/perangkat-lunak" },
        { name: "Sistem Parkir", link: "/layanan/sistem-parkir" },
        { name: "Sistem Ticketing", link: "/layanan/sistem-ticketing" },
        { name: "Gate Perumahan", link: "/layanan/gate-perumahan" },
      ],
    },
    { name: "PORTOFOLIO", link: "/portfolio", icon: <FaBriefcase /> },
    { name: "KONTAK", link: "/contact", icon: <FaPhone /> },
  ];

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Hamburger clicked!", !isOpen);
    setIsOpen(!isOpen);
  };

  const MobileMenuItem = ({ item, idx }) => {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const isActive = location.pathname === item.link;
    const hasSubmenu = item.submenu;

    return (
      <div key={idx}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          exit={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.3 }}
        >
          {hasSubmenu ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSubmenuOpen(!submenuOpen);
              }}
              className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-slate-300 transition-all duration-300 relative group ${
                isActive
                  ? "bg-slate-800/80 text-cyan-400 border-r-2 border-cyan-400"
                  : "hover:bg-slate-800/50 hover:text-cyan-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <motion.span
                  className="text-xl filter grayscale group-hover:filter-none transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  {item.icon}
                </motion.span>
                <span className="font-medium">{item.name}</span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  submenuOpen ? "rotate-180" : ""
                }`}
              />

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"
                  layoutId="sidebarActive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </button>
          ) : (
            <Link
              to={item.link}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between gap-4 px-6 py-4 text-slate-300 transition-all duration-300 relative group ${
                isActive
                  ? "bg-slate-800/80 text-cyan-400 border-r-2 border-cyan-400"
                  : "hover:bg-slate-800/50 hover:text-cyan-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <motion.span
                  className="text-xl filter grayscale group-hover:filter-none transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  {item.icon}
                </motion.span>
                <span className="font-medium">{item.name}</span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"
                  layoutId="sidebarActive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </Link>
          )}
        </motion.div>

        {/* Submenu for mobile */}
        {hasSubmenu && submenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-800/50 overflow-hidden"
          >
            {item.submenu.map((subItem, subIdx) => (
              <Link
                key={subIdx}
                to={subItem.link}
                onClick={() => setIsOpen(false)}
                className="block pl-16 pr-6 py-3 text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-700/30 transition-all duration-200"
              >
                {subItem.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 shadow-2xl"
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${
                i % 3 === 0
                  ? "bg-cyan-400/30"
                  : i % 3 === 1
                  ? "bg-blue-500/30"
                  : "bg-emerald-400/30"
              } rounded-full`}
              style={{
                left: `${10 + ((i * 75) % 80)}%`,
                top: `${20 + ((i * 60) % 60)}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.img
                src="logostn.png"
                alt="Logo STN"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg bg-white/10 p-1"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-lg">
                  Surya Teknologi Nasional
                </span>
                <span className="text-xs text-slate-400 hidden sm:block">
                  Teknologi Keamanan Masa Depan
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6 items-center">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.link;
                const hasSubmenu = item.submenu;

                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => hasSubmenu && setServicesHover(true)}
                    onMouseLeave={() => hasSubmenu && setServicesHover(false)}
                  >
                    <Link
                      to={item.link}
                      className={`relative text-slate-300 hover:text-cyan-400 transition-all duration-300 text-sm xl:text-base font-medium whitespace-nowrap group flex items-center ${
                        isActive ? "text-cyan-400" : ""
                      }`}
                    >
                      {item.name}
                      {hasSubmenu && (
                        <ChevronDown
                          size={16}
                          className={`ml-1 transition-transform duration-300 ${
                            servicesHover ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      {isActive && (
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

                    {/* Submenu for LAYANAN KAMI */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {servicesHover && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
                          >
                            {item.submenu.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                to={subItem.link}
                                className="block px-4 py-3 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-200"
                                onClick={() => setServicesHover(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Hamburger Button - Fixed untuk mobile */}
            <div className="lg:hidden relative z-50">
              <button
                type="button"
                className="focus:outline-none text-slate-300 hover:text-cyan-400 transition-colors duration-300 
                          p-3 rounded-lg hover:bg-slate-800/50 flex items-center justify-center
                          touch-manipulation select-none"
                onClick={handleToggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
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
                      <X size={28} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={28} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Fix untuk touch devices */
        button {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>

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
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Sidebar particles background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 ${
                      i % 4 === 0
                        ? "bg-cyan-400/20"
                        : i % 4 === 1
                        ? "bg-blue-500/20"
                        : i % 4 === 2
                        ? "bg-emerald-400/20"
                        : "bg-purple-400/20"
                    } rounded-sm`}
                    style={{
                      left: `${5 + ((i * 67) % 90)}%`,
                      top: `${10 + ((i * 43) % 80)}%`,
                    }}
                    animate={{
                      y: [-15, 15, -15],
                      x: [-10, 10, -10],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Sidebar Header */}
              <div className="relative z-10 bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="logostn.png"
                      alt="Logo STN"
                      className="w-12 h-12 object-contain rounded-lg bg-white/10 p-1"
                    />
                    <div>
                      <h1 className="text-lg font-bold text-white">
                        Surya Teknologi Nasional
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

              {/* Navigation Menu - Tanpa scrollbar */}
              <nav
                className="relative z-10 py-4 flex-1 custom-scrollbar"
                style={{
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {menuItems.map((item, idx) => (
                  <MobileMenuItem key={idx} item={item} idx={idx} />
                ))}

                {/* Login Button Mobile */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  exit={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                  className="px-6 py-4"
                >
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    <span>Login</span>
                  </Link>
                </motion.div>
              </nav>

              {/* Divider */}
              <div className="relative z-10 mx-6 border-t border-slate-700"></div>

              {/* Contact Info */}
              <div className="relative z-10 p-6 bg-slate-800/50 backdrop-blur-sm">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-cyan-400">📧</span> Hubungi Kami
                </h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <motion.p
                    className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-blue-400">📞</span> (021) 123-4567
                  </motion.p>
                  <motion.p
                    className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-emerald-400">✉️</span> info@stn.co.id
                  </motion.p>
                  <motion.p
                    className="flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-purple-400">📍</span> Jakarta,
                    Indonesia
                  </motion.p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-300 font-semibold">
                © {new Date().getFullYear()}{" "}
                <span className="text-blue-700">Surya Teknologi Nasional</span>.
                All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
