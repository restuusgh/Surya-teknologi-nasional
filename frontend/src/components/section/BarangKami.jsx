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
      className="py-16 bg-gray-40 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="bg-white/40 rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Produk Kami</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-lg"
                />
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
              </div>

              {/* Harga dan tombol dengan jarak yang pas */}
              <div className="mt-6 flex flex-col items-center">
                <span className="text-gray-700 font-semibold mb-4">{product.price}</span>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 shadow-md">
                  Beli Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarangKami;
