import React from "react";
import { motion } from "framer-motion";

const BarangKami = () => {
  const products = [
    { id: 1, name: "Automatic Barrier Gate MX 50", 
        description: "Palang Parkir Otomatis", 
        image: "public/automatic.jpg" },

    { id: 2, name: "Automatic Barrier Gate MX Servo", 
        description: "Palang Parkir Otomatis", 
        image: "public/automatic2.jpg" },

    { id: 3, name: "Automatic Barrier Gate Servo", 
        description: "Palang Parkir Otomatis", 
        image: "public/automatic3.jpg" },

    { id: 4, name: "Dispenser Tiket LED",
        description: "Mesin Tiket Otomatis", 
        image: "public/dispenser.jpg" },

    { id: 5, name: "Dispenser Tiket Perumahan", 
        description: "Mesin Tiket Otomatis", 
        image: "public/dispenser2.jpg" },

    { id: 6, name: "Dispenser Tiket Perumahan", 
        description: "Mesin Tiket Otomatis", 
        image: "public/dispenser3.jpg" },

    { id: 7, name: "Tripod Turnstile",
         description: "Alat Pengendali Akses", 
         image: "public/foto1.jpg" },

    { id: 8, name: "Flap barrier", 
        description: "Sistem Pengendali Akses Otomatis", 
        image: "public/foto2.jpg" },

    { id: 9, name: "Swing Barrier", 
        description: "Palang Parkir Otomatis dengan Motor Servo", 
        image: "public/foto3.jpg" },

    { id: 10, name: "Vehicle Loop Detector", 
        description: "Sensor kendaraan untuk palang parkir otomatis", 
        image: "public/foto4.jpg" },

    { id: 11, name: "UHF Reader", 
        description: "Pembaca kartu RFID jarak jauh", 
        image: "public/foto5.jpg" },

    { id: 12, name: "Controller MX 50", 
        description: "Pengendali palang parkir otomatis", 
        image: "public/foto6.jpg" },

    { id: 13, name: "Controller Servo", 
        description: "Pengendali motor servo untuk palang parkir", 
        image: "public/foto7.jpg" },
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

  {/* Tombol selalu di bawah */}
  <button className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 shadow-md">
    Beli Sekarang
  </button>
</motion.div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default BarangKami;