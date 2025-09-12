import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-blue-100 bg-cover bg-center"
      style={{ backgroundImage: "url('pos-to-pos.jpg')" }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Konten */}
      <div className="relative z-10 text-center px-6">
        {/* Judul dengan animasi */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-200 drop-shadow-lg -mt-20"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Selamat Datang di{" "}
          <br />
          <span className="text-yellow-300">Surya Teknologi Nasional</span>
        </motion.h1>

        {/* Teks efek mengetik */}
        <motion.p
          className="mt-4 text-xl md:text-2xl text-gray-200 font-bold max-w-3xl mx-auto h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <ReactTyped
            strings={[
              "Kami menjadi solusi untuk segala permasalahan anda",
              "Teknologi modern untuk kebutuhan Anda",
              "Inovasi, Efisiensi, dan Kepercayaan",
              "Partner terbaik menuju masa depan digital",
            ]}
            typeSpeed={50}
            backSpeed={30}
            backDelay={2000}
            loop
          />
        </motion.p>

        {/* Tombol CTA */}
        <motion.div
          className="mt-8 space-x-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        >
          <button className="bg-yellow-300 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 shadow-lg">
            Hubungi Kami
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-200">
            Lihat Layanan
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;