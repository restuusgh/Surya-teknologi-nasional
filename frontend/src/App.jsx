import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Komponen Transition & Layout
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

// Chat
import ChatWidget from "./chat/ChatWidget";


// 🔹 Layout Admin
const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <a href="/admin" className="hover:text-gray-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/admin/products" className="hover:text-gray-300">
              Produk
            </a>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};


// 🔹 Routing dengan animasi
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

  // CRUD Produk (sementara dummy)
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
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
              <Transition />
              <Home />
              <BarangKami />
              <About />
              <Services />
              <Portfolio />
              <Contact />
            </>
          }
        />

        {/* Halaman per section */}
        <Route path="/barangkami" element={<><Transition /><BarangKami /></>} />
        <Route path="/about" element={<><Transition /><About /></>} />
        <Route path="/services" element={<><Transition /><Services /></>} />
        <Route path="/portfolio" element={<><Transition /><Portfolio /></>} />
        <Route path="/contact" element={<><Transition /><Contact /></>} />

        {/* Detail produk */}
        <Route path="/layanan/perangkat-lunak" element={<><Transition /><PerangkatLunak /></>} />
        <Route path="/layanan/sistem-parkir" element={<><Transition /><SistemParkir /></>} />
        <Route path="/layanan/sistem-ticketing" element={<><Transition /><SistemTicketing /></>} />

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
          path="/admin"
          element={
            isAdmin ? (
              <>
                <Transition />
                <AdminLayout onLogout={handleLogout}>
                  <AdminDashboard
                    products={products}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
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
      </Routes>
    </AnimatePresence>
  );
};


// 🔹 App Utama
const AppWrapper = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Cek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    if (token && admin) {
      setIsAdmin(JSON.parse(admin));
    }
  }, []);

  // Kalau path mulai dengan "/admin", jangan tampilkan Navbar & ChatWidget
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <AnimatedRoutes
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        products={products}
        setProducts={setProducts}
      />
      {!isAdminPage && <ChatWidget />}
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
