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

/* ================== LAYOUT & UTIL ================== */
import Transition from "./transition/Transition";
import Navbar from "./components/section/Navbar";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./chat/ChatWidget";

/* ================== PUBLIC PAGES ================== */
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";
import PortfolioDetail from "./components/PortfolioDetail/PortfolioDetail";

/* ================== DETAIL SERVICES ================== */
import PerangkatLunak from "./components/detailProduk/PerangkatLunak";
import SistemParkir from "./components/detailProduk/SistemParkir";
import SistemTicketing from "./components/detailProduk/SistemTicketing";

/* ================== AUTH & ADMIN ================== */
import LoginForm from "./Auth/LoginForm";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";

/* ================== ADMIN SECTIONS ================== */
import Product from "./Admin/SectionAdmin/Product";
import Layanan from "./Admin/SectionAdmin/Layanan";
import PortfolioAdmin from "./Admin/SectionAdmin/Portofolio";

const AppInner = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  /* ===== CEK LOGIN ADMIN ===== */
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      try {
        setIsAdmin(JSON.parse(admin));
      } catch {
        localStorage.removeItem("admin");
      }
    }
  }, []);

  /* ===== CEK HALAMAN ===== */
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const showPublicLayout = !isAdminPage && !isLoginPage;

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(null);
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR ONLY PUBLIC */}
      {showPublicLayout && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route
            path="/"
            element={
              <>
                <Transition />
                <Home />
              </>
            }
          />

          <Route path="/barangkami" element={<><Transition /><BarangKami /></>} />
          <Route path="/about" element={<><Transition /><About /></>} />
          <Route path="/services" element={<><Transition /><Services /></>} />
          <Route path="/portfolio" element={<><Transition /><Portfolio /></>} />
          <Route path="/contact" element={<><Transition /><Contact /></>} />

          <Route
            path="/portfolio/:id"
            element={<><Transition /><PortfolioDetail /></>}
          />

          {/* ================= DETAIL LAYANAN ================= */}
          <Route
            path="/services/software"
            element={<><Transition /><PerangkatLunak /></>}
          />
          <Route
            path="/services/parking-system"
            element={<><Transition /><SistemParkir /></>}
          />
          <Route
            path="/services/ticketing-system"
            element={<><Transition /><SistemTicketing /></>}
          />

          {/* ================= LOGIN ================= */}
          <Route
            path="/login"
            element={
              <>
                <Transition />
                <LoginForm
                  onLogin={(adminData) => {
                    setIsAdmin(adminData);
                    localStorage.setItem(
                      "admin",
                      JSON.stringify(adminData)
                    );
                    navigate("/admin/dashboard");
                  }}
                />
              </>
            }
          />

          {/* ================= ADMIN (NESTED ROUTES) ================= */}
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
            {/* DEFAULT */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route
              path="dashboard"
              element={<AdminDashboard onLogout={handleLogout} />}
            />

            <Route path="products" element={<Product />} />

            <Route path="portfolio" element={<PortfolioAdmin />} />

            <Route path="layanan" element={<Layanan />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* FOOTER & CHAT ONLY PUBLIC */}
      {showPublicLayout && <ChatWidget />}
      {showPublicLayout && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppInner />
  </Router>
);

export default App;
