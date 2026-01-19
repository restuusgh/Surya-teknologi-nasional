import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Cog,
  ChevronLeft,
  Menu,
  Bell,
  Search,
  LogOut,
  Settings,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ adminData, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      id: "products",
      label: "Produk",
      icon: Package,
      path: "/admin/products",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: Briefcase,
      path: "/admin/portfolio",
    },
    {
      id: "layanan",
      label: "Layanan",
      icon: Cog,
      path: "/admin/layanan",
    },
  ];

  const currentMenu = menuItems.find((item) =>
    location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="w-80 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 text-white z-20"
        >
          <div className="p-6 h-full flex flex-col">
            {/* ===== SIDEBAR HEADER ===== */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {adminData?.username || "Admin Panel"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Surya Teknologi Nasional
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-800/60 rounded-lg"
              >
                <ChevronLeft />
              </button>
            </div>

            {/* ===== MENU ===== */}
            <nav className="flex-1 space-y-2">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-4 px-3">
                Navigation
              </p>

              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-cyan-400" : "text-slate-400"
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeDot"
                            className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* ===== LOGOUT ===== */}
            <button
              onClick={onLogout}
              className="mt-6 flex items-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-xl text-red-300 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOP BAR ===== */}
        <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-800/60 rounded-lg"
              >
                <Menu className="text-white" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white">
                {currentMenu?.label || "Dashboard"}
              </h1>
              <p className="text-sm text-slate-400">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Search className="text-slate-300" />
            <Bell className="text-slate-300" />
            <div className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
              {adminData?.username?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
