import React from "react";
import { motion } from "framer-motion";

const BarangKami = () => {
  const products = [
    {
      id: 1,
      name: "Automatic Barrier Gate MX 50",
      description: "Palang Parkir Otomatis",
      image: "/automatic.jpg",
      price: "Rp 12.000.000"
    },
    {
      id: 2,
      name: "Automatic Barrier Gate MX Servo",
      description: "Palang Parkir Otomatis",
      image: "/automatic2.jpg",
      price: "Rp 14.000.000"
    },
    {
      id: 3,
      name: "Automatic Barrier Gate Servo",
      description: "Palang Parkir Otomatis",
      image: "/automatic3.jpg",
      price: "Rp 13.500.000"
    },
    {
      id: 4,
      name: "Dispenser Tiket LED",
      description: "Mesin Tiket Otomatis",
      image: "/dispenser.jpg",
      price: "Rp 8.000.000"
    },
    {
      id: 5,
      name: "Dispenser Tiket Perumahan",
      description: "Mesin Tiket Otomatis",
      image: "/dispenser2.jpg",
      price: "Rp 7.500.000"
    },
    {
      id: 6,
      name: "Dispenser Tiket Perumahan",
      description: "Mesin Tiket Otomatis",
      image: "/dispenser3.jpg",
      price: "Rp 7.000.000"
    },
    {
      id: 7,
      name: "Tripod Turnstile",
      description: "Alat Pengendali Akses",
      image: "/foto1.jpg",
      price: "Rp 9.500.000"
    },
    {
      id: 8,
      name: "Flap Barrier",
      description: "Sistem Pengendali Akses Otomatis",
      image: "/foto2.jpg",
      price: "Rp 16.000.000"
    },
    {
      id: 9,
      name: "Swing Barrier",
      description: "Palang Parkir Otomatis dengan Motor Servo",
      image: "/foto3.jpg",
      price: "Rp 15.000.000"
    },
    {
      id: 10,
      name: "Vehicle Loop Detector",
      description: "Sensor kendaraan untuk palang parkir otomatis",
      image: "/foto4.jpg",
      price: "Rp 1.500.000"
    },
    {
      id: 11,
      name: "UHF Reader",
      description: "Pembaca kartu RFID jarak jauh",
      image: "/foto5.jpg",
      price: "Rp 3.500.000"
    },
    {
      id: 12,
      name: "Controller MX 50",
      description: "Pengendali palang parkir otomatis",
      image: "/foto6.jpg",
      price: "Rp 2.000.000"
    },
    {
      id: 13,
      name: "Controller Servo",
      description: "Pengendali motor servo untuk palang parkir",
      image: "/foto7.jpg",
      price: "Rp 2.500.000"
    }
  ];

  return (
    <section
      id="barangkami"
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              i % 4 === 0 ? 'bg-cyan-400/20' :
              i % 4 === 1 ? 'bg-blue-500/20' :
              i % 4 === 2 ? 'bg-emerald-400/20' :
              'bg-purple-400/20'
            } rounded-sm`}
            style={{
              left: `${10 + (i * 67) % 80}%`,
              top: `${15 + (i * 43) % 70}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Produk <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kami</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Koleksi lengkap sistem parkir otomatis dan pengendali akses berkualitas tinggi
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 shadow-2xl rounded-2xl p-6 flex flex-col justify-between text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-contain rounded-xl bg-white p-2 group-hover:scale-105 transition-transform duration-500"
 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {product.description}
                </p>
              </div>

              {/* Harga + CTA */}
              <div className="mt-6">
                <span className="block text-lg font-semibold text-cyan-400 mb-4">{product.price}</span>
                <motion.button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Beli Sekarang
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}

      </div>
    </section>
  );
};

export default BarangKami;
