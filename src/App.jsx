import React from 'react'
import Navbar from './components/section/Navbar'

const App = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand / Logo */}
        <div className="text-2xl font-bold text-indigo-700">
          etail.me
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-8 text-indigo-600 font-medium">
            <li><a href="#home" className="hover:text-indigo-900">Home</a></li>
            <li><a href="#produk" className="hover:text-indigo-900">Tentang Kami</a></li>
            <li><a href="#services" className="hover:text-indigo-900">Layanan Kami</a></li>
            <li><a href="#portfolio" className="hover:text-indigo-900">Portofolio</a></li>
            <li><a href="#contact" className="hover:text-indigo-900">Kontak Kami</a></li>
          </ul>
        </nav>  
    </div>
    </header>
  )
}

export default App