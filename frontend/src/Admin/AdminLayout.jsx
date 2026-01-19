import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Briefcase, 
  Settings,
  ChevronLeft,
  Menu,
  User,
  Bell,
  Search,
  LogOut
} from 'lucide-react';

const AdminLayout = ({ children, adminData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'products', label: 'Produk', icon: Package, href: '/admin/products' },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase, href: '/admin/portfolio' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${i % 4 === 0 ? 'bg-cyan-400/10' : i % 4 === 1 ? 'bg-blue-500/10' : i % 4 === 2 ? 'bg-emerald-400/10' : 'bg-purple-400/10'} rounded-full`}
            style={{ left: `${20 + (i * 67) % 60}%`, top: `${25 + (i * 43) % 50}%` }}
            animate={{ y: [-10, 10, -10], x: [-8, 8, -8], opacity: [0.1, 0.3, 0.1], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 6 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: isSidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 text-white relative z-10 overflow-hidden`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header Sidebar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {adminData?.username || 'Admin Panel'}
                  </h2>
                  <p className="text-xs text-slate-400">Surya Teknologi</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                Navigation
              </p>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <motion.div className="absolute right-2 w-2 h-2 bg-cyan-400 rounded-full" layoutId="activeIndicator" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  </motion.a>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Quick Actions</p>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300">
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Search</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="mt-6">
              <motion.button className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-xl transition-all duration-300" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <motion.header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <motion.button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-white" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Menu className="w-5 h-5" />
                </motion.button>
              )}
              <div>
                <h1 className="text-lg font-semibold text-white">{menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}</h1>
                <p className="text-sm text-slate-400">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            {/* Top Bar Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-300 hover:text-white"><Search className="w-5 h-5" /></button>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-300 hover:text-white"><Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </button>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">{adminData?.username?.charAt(0).toUpperCase() || 'A'}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.main className="flex-1 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
          {children}
        </motion.main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-5 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminLayout;
