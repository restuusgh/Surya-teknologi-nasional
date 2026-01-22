import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/* ===== LAYOUT ===== */
import Transition from "./transition/Transition";
import Navbar from "./components/section/Navbar";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./chat/ChatWidget";

/* ===== PUBLIC ===== */
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import ServiceDetail from "./components/detailProduk/ServiceDetail";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";
import PortfolioDetail from "./components/PortfolioDetail/PortfolioDetail";

/* ===== ADMIN ===== */
import LoginForm from "./Auth/LoginForm";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import Product from "./Admin/SectionAdmin/Product";
import Layanan from "./Admin/SectionAdmin/Layanan";
import PortfolioAdmin from "./Admin/SectionAdmin/Portofolio";

const AppInner = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) setIsAdmin(JSON.parse(admin));
  }, []);

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const showPublicLayout = !isAdminPage && !isLoginPage;

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(null);
    navigate("/login");
  };

  return (
    <>
      {showPublicLayout && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ===== PUBLIC ===== */}
          <Route path="/" element={<><Transition /><Home /></>} />
          <Route path="/barangkami" element={<><Transition /><BarangKami /></>} />
          <Route path="/about" element={<><Transition /><About /></>} />

          {/* 🔥 SERVICES */}
          <Route path="/services" element={<><Transition /><Services /></>} />
          <Route
            path="/services/:id"
            element={<><Transition /><ServiceDetail /></>}
          />

          <Route path="/portfolio" element={<><Transition /><Portfolio /></>} />
          <Route path="/contact" element={<><Transition /><Contact /></>} />
          <Route
            path="/portfolio/:id"
            element={<><Transition /><PortfolioDetail /></>}
          />

          {/* ===== LOGIN ===== */}
          <Route
            path="/login"
            element={
              <>
                <Transition />
                <LoginForm
                  onLogin={(adminData) => {
                    setIsAdmin(adminData);
                    localStorage.setItem("admin", JSON.stringify(adminData));
                    navigate("/admin/dashboard");
                  }}
                />
              </>
            }
          />

          {/* ===== ADMIN ===== */}
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminLayout adminData={isAdmin} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="portfolio" element={<PortfolioAdmin />} />
            <Route path="layanan" element={<Layanan />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {showPublicLayout && <ChatWidget />}
      {showPublicLayout && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
