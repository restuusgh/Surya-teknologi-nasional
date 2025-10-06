import React, { useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState("vision");

  const listVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.25, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-700 via-slate-600 text-white py-20 sm:py-24 px-4 sm:px-8 md:px-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Tentang Kami
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
            PT Surya Teknologi Nasional adalah perusahaan yang berfokus pada
            solusi teknologi informasi. Kami menghadirkan layanan terbaik dalam
            pengembangan perangkat lunak, sistem parkir, dan sistem ticketing
            untuk memenuhi kebutuhan dunia digital modern.
          </p>
        </motion.div>
      </div>

      {/* Sejarah Perusahaan */}
      <div className="relative bg-gradient-to-br from-slate-100 via-slate-200 to-cyan-100 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
          <motion.div
            className="relative group flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/logostn.png"
              alt="Sejarah Perusahaan"
              className="w-2/3 sm:w-1/2 md:w-1/2 lg:w-2/5 rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-700 mb-4 md:-ml-24 lg:-ml-56 mt-4 md:-mt-6">
              Sejarah Perusahaan
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify md:-ml-24 lg:-ml-56 mt-4 md:mt-8">
              Kami ada sejak 2017 dan berlokasi di Bandung, Jawa Barat. Kami
              selalu berfokus pada harapan client dengan membuat perangkat lunak
              custom. Di era digital sekarang ini kami berharap banyak
              perusahaan yang terbantu dengan solusi yang kami berikan. Kami
              memiliki 3 layanan utama yaitu membuat perangkat lunak custom,
              sistem parkir, dan sistem ticketing. Kami selalu berorientasi
              kepada pelanggan dengan menawarkan solusi dimulai dari konsultasi,
              perancangan, implementasi yang selalu terpantau, serta layanan
              maintenance untuk memastikan produk kami berjalan dengan baik
              untuk kebutuhan perusahaan Anda.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Visi dan Misi Section */}
      <div className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-slate-700 via-slate-600 to-cyan-700 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              VISI DAN MISI
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-20 sm:w-28 md:w-32 bg-white/30"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <div className="h-px w-20 sm:w-28 md:w-32 bg-white/30"></div>
            </div>
          </motion.div>

          {/* Tombol Vision & Mission */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 sm:mb-12">
            {["vision", "mission"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold transition-all duration-300 rounded-full ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-105"
                    : "bg-white/10 text-white hover:bg-purple-500/70 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === "vision" ? "Vision" : "Mission"}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-2 sm:px-4"
          >
            <div className="h-px w-full bg-white/20 mb-8 sm:mb-12"></div>

            {activeTab === "vision" ? (
              <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed text-center">
                Be trusted IT company in South East Asia. We always present
                innovation and give solution in IT sector for fulfillment in
                Globalization.
              </p>
            ) : (
              <ul className="text-white text-base sm:text-lg md:text-xl leading-relaxed space-y-3 sm:space-y-4">
                {[
                  "Understand the needed of application in Society",
                  "Be leader to give solution in IT sector",
                  "Excellent in designing Web-Based application, Mobile-Based application, dan Desktop-Based application",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariant}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-3 hover:translate-x-2 hover:text-purple-300 transition-all duration-300"
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
