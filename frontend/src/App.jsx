import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PortfolioDetail from "./components/PortfolioDetail/PortfolioDetail";

import Footer from "./components/Footer/Footer";
import Transition from "./transition/Transition";
import Navbar from "./components/section/Navbar";

// Halaman utama
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";

// Detail produk
import PerangkatLunak from "./components/detailProduk/PerangkatLunak";
import SistemParkir from "./components/detailProduk/SistemParkir";
import SistemTicketing from "./components/detailProduk/SistemTicketing";

// Auth & Dashboard
import LoginForm from "./Auth/LoginForm";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLayout from "./Admin/AdminLayout";

// Chat
import ChatWidget from "./chat/ChatWidget";

const AppInner = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smart Parking System Pro",
      description:
        "Sistem parkir otomatis dengan sensor IoT dan AI detection untuk memudahkan pengelolaan parkir.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      price: "Rp 50.000.000",
      link: "/services/parking-system",
    },
    {
      id: 2,
      name: "RFID Access Control",
      description:
        "Sistem akses kontrol dengan teknologi RFID terbaru untuk keamanan maksimal.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      price: "Rp 15.000.000",
      link: "/services/software",
    },
    {
      id: 3,
      name: "Digital Ticketing System",
      description:
        "Sistem tiket digital terintegrasi untuk berbagai jenis event dan transportasi.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
      price: "Rp 25.000.000",
      link: "/services/ticketing-system",
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    if (token && admin) {
      try {
        setIsAdmin(JSON.parse(admin));
      } catch (error) {
        console.error("Error parsing admin data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      }
    }
  }, []);

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const shouldShowNavbar = !isAdminPage && !isLoginPage;

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setIsAdmin(null);
    navigate("/login");
  };

  // CRUD Produk
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: Date.now(), ...newProduct }]);
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Routes location={location} key={location.pathname}>
          {/* === Halaman utama === */}
          <Route
            path="/"
            element={
              <>
                <Transition />
                <Home />
              </>
            }
          />

          {/* === Halaman per section === */}
          <Route
            path="/barangkami"
            element={
              <>
                <Transition />
                <BarangKami />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Transition />
                <About />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Transition />
                <Services />
              </>
            }
          />
          <Route
            path="/portfolio"
            element={
              <>
                <Transition />
                <Portfolio />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Transition />
                <Contact />
              </>
            }
          />

          <Route
            path="/portfolio/:id"
            element={
              <>
                <Transition />
                <PortfolioDetail />
              </>
            }
          />

          {/* === Detail Produk / Layanan === */}
          <Route
            path="/services/software"
            element={
              <>
                <Transition />
                <PerangkatLunak />
              </>
            }
          />
          <Route
            path="/services/parking-system"
            element={
              <>
                <Transition />
                <SistemParkir />
              </>
            }
          />
          <Route
            path="/services/ticketing-system"
            element={
              <>
                <Transition />
                <SistemTicketing />
              </>
            }
          />

          {/* === Login === */}
          <Route
            path="/login"
            element={
              <>
                <Transition />
                <LoginForm
                  onLogin={(adminData) => {
                    setIsAdmin(adminData);
                    navigate("/admin");
                  }}
                />
              </>
            }
          />

          {/* === Dashboard Admin === */}
          <Route
            path="/admin/*"
            element={
              isAdmin ? (
                <>
                  <Transition />
                  <AdminLayout>
                    <Routes>
                      <Route
                        index
                        element={
                          <AdminDashboard
                            products={products}
                            onAddProduct={handleAddProduct}
                            onUpdateProduct={handleUpdateProduct}
                            onDeleteProduct={handleDeleteProduct}
                            onLogout={handleLogout}
                          />
                        }
                      />
                      <Route
                        path="dashboard"
                        element={
                          <AdminDashboard
                            products={products}
                            onAddProduct={handleAddProduct}
                            onUpdateProduct={handleUpdateProduct}
                            onDeleteProduct={handleDeleteProduct}
                            onLogout={handleLogout}
                          />
                        }
                      />
                      <Route
                        path="products"
                        element={
                          <AdminDashboard
                            products={products}
                            onAddProduct={handleAddProduct}
                            onUpdateProduct={handleUpdateProduct}
                            onDeleteProduct={handleDeleteProduct}
                            onLogout={handleLogout}
                          />
                        }
                      />
                    </Routes>
                  </AdminLayout>
                </>
              ) : (
                <>
                  <Transition />
                  <LoginForm
                    onLogin={(adminData) => {
                      setIsAdmin(adminData);
                      navigate("/admin");
                    }}
                  />
                </>
              )
            }
          />

          {/* === Ganti halaman 404 dengan PerangkatLunak === */}
          <Route
            path="*"
            element={
              <>
                <Transition />
                <PerangkatLunak />
              </>
            }
          />
        </Routes>
      </AnimatePresence>
      {shouldShowNavbar && <ChatWidget />}
      {shouldShowNavbar && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppInner />
  </Router>
);

export default App;
