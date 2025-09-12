import React, { useState } from "react";

const Navbar = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (section) => {
    setView(section);
    setIsOpen(false);
  };

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
            <button onClick={() => handleClick("home")} className="text-gray-800 hover:text-indigo-800">HOME</button>
            <button onClick={() => handleClick("barangkami")} className="text-gray-800 hover:text-indigo-800">BARANG KAMI</button>
            <button onClick={() => handleClick("produk")} className="text-gray-800 hover:text-indigo-800">TENTANG KAMI</button>
            <button onClick={() => handleClick("services")} className="text-gray-800 hover:text-indigo-800">LAYANAN KAMI</button>
            <button onClick={() => handleClick("portfolio")} className="text-gray-800 hover:text-indigo-800">PORTOFOLIO</button>
            <button onClick={() => handleClick("contact")} className="text-gray-800 hover:text-indigo-800">KONTAK KAMI</button>
          </nav>

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
            <button onClick={() => handleClick("home")}>HOME</button>
            <button onClick={() => handleClick("barangkami")}>BARANG KAMI</button>
            <button onClick={() => handleClick("produk")}>TENTANG KAMI</button>
            <button onClick={() => handleClick("services")}>LAYANAN KAMI</button>
            <button onClick={() => handleClick("portfolio")}>PORTOFOLIO</button>
            <button onClick={() => handleClick("contact")}>KONTAK KAMI</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;