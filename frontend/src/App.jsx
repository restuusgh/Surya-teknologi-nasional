import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Footer from "../Footer/Footer";
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

// Routing dengan animasi
const AnimatedRoutes = ({ isAdmin, setIsAdmin, products, setProducts }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        {/* Halaman utama - HANYA HOME */}
        <Route
          path="/"
          element={
            <>
              <Transition />
              <Home />
            </>
          }
        />

        {/* Halaman per section */}
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

        {/* Detail layanan */}
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
        <Route 
          path="/services/residential-gate" 
          element={
            <>
              <Transition />
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold text-white mb-6 text-center">
                    Gate Perumahan
                  </h1>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                    <p className="text-slate-300 text-center text-lg">
                      Halaman Gate Perumahan sedang dalam pengembangan
                    </p>
                  </div>
                </div>
              </div>
            </>
          } 
        />

        {/* Login */}
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

        {/* Admin Dashboard */}
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
                    <Route
                      path="portfolio"
                      element={
                        <div className="p-8">
                          <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl font-bold text-white mb-6">
                              Portfolio Management
                            </h1>
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                              <p className="text-slate-300 text-center">
                                Halaman Portfolio Management sedang dalam pengembangan
                              </p>
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <div className="p-8">
                          <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl font-bold text-white mb-6">
                              User Management
                            </h1>
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                              <p className="text-slate-300 text-center">
                                Halaman User Management sedang dalam pengembangan
                              </p>
                            </div>
                          </div>
                        </div>
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

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <>
              <Transition />
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
                <div className="text-center space-y-6">
                  <h1 className="text-6xl font-bold text-cyan-400">404</h1>
                  <h2 className="text-2xl font-semibold text-white">Halaman Tidak Ditemukan</h2>
                  <p className="text-slate-400 max-w-md">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// App Wrapper - useLocation sekarang berada di dalam Router context
const AppWrapper = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smart Parking System Pro",
      description: "Sistem parkir otomatis dengan sensor IoT dan AI detection untuk memudahkan pengelolaan parkir",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      price: "Rp 50.000.000"
    },
    {
      id: 2,
      name: "RFID Access Control",
      description: "Sistem akses kontrol dengan teknologi RFID terbaru untuk keamanan maksimal",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      price: "Rp 15.000.000"
    },
    {
      id: 3,
      name: "Digital Ticketing System",
      description: "Sistem tiket digital terintegrasi untuk berbagai jenis event dan transportasi",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
      price: "Rp 25.000.000"
    }
  ]);

  const location = useLocation();

  // Cek token di localStorage
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

  // Kondisi untuk menampilkan Navbar & ChatWidget
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const shouldShowNavbar = !isAdminPage && !isLoginPage;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <AnimatedRoutes
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        products={products}
        setProducts={setProducts}
      />
      {shouldShowNavbar && <ChatWidget />}
      {shouldShowNavbar && <Footer />}
    </>
  );
};

// App Utama
const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;