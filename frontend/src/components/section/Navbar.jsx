import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showServices, setShowServices] = useState(false); // submenu sidebar
  const location = useLocation();

  const menuItems = [
    { name: "HOME", link: "/", icon: "🏠" },
    { name: "BARANG KAMI", link: "/barangkami", icon: "📦" },
    { name: "TENTANG KAMI", link: "/about", icon: "ℹ️" },
    { name: "LAYANAN KAMI", link: "/services", icon: "🔧" },
    { name: "PORTOFOLIO", link: "/portfolio", icon: "💼" },
    { name: "KONTAK KAMI", link: "/contact", icon: "📞" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && isOpen) setIsOpen(false);
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

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 shadow-2xl"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.img
                src="logostn.png"
                alt="Logo STN"
                className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1"
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
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.link;

                // Dropdown khusus LAYANAN KAMI
                if (item.name === "LAYANAN KAMI") {
                  return (
                    <div key={idx} className="relative group">
                      <span
                        className={`cursor-pointer relative text-slate-300 hover:text-cyan-400 transition-all duration-300 text-sm xl:text-base font-medium ${
                          isActive ? "text-cyan-400" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                      <div className="absolute left-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
                        <ul className="flex flex-col p-2">
                          <li>
                            <Link to="/services" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-cyan-400">Semua Layanan</Link>
                          </li>
                          <li>
                            <Link to="/layanan/perangkat-lunak" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-cyan-400">Perangkat Lunak</Link>
                          </li>
                          <li>
                            <Link to="/layanan/sistem-parkir" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-cyan-400">Sistem Parkir</Link>
                          </li>
                          <li>
                            <Link to="/layanan/sistem-ticketing" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-cyan-400">Sistem Ticketing</Link>
                          </li>
                          <li>
                            <Link to="/layanan/gate-perumahan" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-cyan-400">Gate Perumahan</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`relative text-slate-300 hover:text-cyan-400 transition-all duration-300 text-sm xl:text-base font-medium ${
                      isActive ? "text-cyan-400" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Hamburger */}
            <motion.button
              className="lg:hidden text-3xl focus:outline-none text-slate-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-72 bg-slate-900 shadow-xl z-50 overflow-y-auto custom-scrollbar"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.link;

                if (item.name === "LAYANAN KAMI") {
                  return (
                    <div key={idx} className="flex flex-col">
                      <button
                        className={`flex justify-between items-center px-4 py-2 rounded-lg text-left text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition ${
                          isActive ? "text-cyan-400" : ""
                        }`}
                        onClick={() => setShowServices(!showServices)}
                      >
                        <span>{item.icon} {item.name}</span>
                        {showServices ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                      </button>
                      <AnimatePresence>
                        {showServices && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-6 mt-2 flex flex-col gap-1 overflow-hidden"
                          >
                            <li><Link to="/services" className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400">Semua Layanan</Link></li>
                            <li><Link to="/layanan/perangkat-lunak" className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400">Perangkat Lunak</Link></li>
                            <li><Link to="/layanan/sistem-parkir" className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400">Sistem Parkir</Link></li>
                            <li><Link to="/layanan/sistem-ticketing" className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400">Sistem Ticketing</Link></li>
                            <li><Link to="/layanan/gate-perumahan" className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400">Gate Perumahan</Link></li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={idx}
                    to={item.link}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition ${
                      isActive ? "text-cyan-400" : ""
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
