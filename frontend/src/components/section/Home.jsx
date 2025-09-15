import React from "react";
import {ReactTyped} from "react-typed";
import { motion } from "framer-motion";
import { Car, Shield, Clock, Zap, ChevronRight, Play } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background 3D Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 border border-emerald-400/40 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Logo/Brand */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  AutoPark Pro
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Parkir{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                  Otomatis
                </span>
                <br />
                Masa Depan
              </motion.h1>

              {/* Typing Effect */}
              <motion.div
                className="text-xl lg:text-2xl text-slate-300 h-16 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <ReactTyped
                  strings={[
                    "Sistem parkir pintar dengan teknologi AI",
                    "Otomatisasi penuh tanpa sentuhan manusia",
                    "Keamanan tingkat enterprise untuk kendaraan Anda",
                    "Efisiensi ruang hingga 300% lebih optimal",
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  backDelay={2000}
                  loop
                />
              </motion.div>

              {/* Features Icons */}
              <motion.div
                className="flex space-x-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="flex items-center space-x-2 text-slate-300">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm">Keamanan 24/7</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Akses Instan</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm">Eco-Friendly</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2">
                  <span>Mulai Sekarang</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Lihat Demo</span>
                </button>
              </motion.div>
            </div>

            {/* Right Content - 3D Parking Animation */}
            {/* ... (lanjut seperti punya kamu, nggak ada masalah besar) */}
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default Home;
