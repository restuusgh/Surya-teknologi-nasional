import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="logostn.png" alt="Logo STN" className="h-10 w-auto" />
            <span className="font-semibold text-indigo-800">
              Surya Teknologi Nasional
            </span>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-800 hover:text-indigo-800">HOME</a>
            <a href="#Barangkami" className="text-gray-800 hover:text-indigo-800">BARANG KAMI</a>
            <a href="#produk" className="text-gray-800 hover:text-indigo-800">TENTANG KAMI</a>
            <a href="#services" className="text-gray-800 hover:text-indigo-800">LAYANAN KAMI</a>
            <a href="#portfolio" className="text-gray-800 hover:text-indigo-800">PORTOFOLIO</a>
            <a href="#contact" className="text-gray-800 hover:text-indigo-800">KONTAK KAMI</a>
          </nav>

          {/* Actions */}
          
          {/* Burger button (mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-100 shadow-lg">
          <nav className="flex flex-col space-y-3 p-4">
            <a href="#home" className="text-gray-800 hover:text-indigo-800">Home</a>
            <a href="#produk2" className="text-gray-800 hover:text-indigo-800">BARANG KAMI</a>
            <a href="#produk" className="text-gray-800 hover:text-indigo-800">TENTANG KAMI</a>
            <a href="#services" className="text-gray-800 hover:text-indigo-800">LAYANAN KAMI</a>
            <a href="#portfolio" className="text-gray-800 hover:text-indigo-800">PORTOFOLIO</a>
            <a href="#contact" className="text-gray-800 hover:text-indigo-800">KONTAK KAMI</a>
            <div className="flex gap-3 pt-3">
              <button className="flex-1 px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Login
              </button>
              <button className="flex-1 px-4 py-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-800">
                Start Selling
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar; 