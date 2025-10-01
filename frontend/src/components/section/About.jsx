import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const sections = [
    {
      id: 1,
      title: "Sejarah Kami",
      textId: "sejarah",
      image: "/logostn.png",
      content:
        "Surya Teknologi Nasional didirikan pada tahun 2010 dengan semangat membangun transformasi digital. Kami terus berkembang untuk menjadi mitra solusi digital terbaik di Indonesia.",
    },
    {
      id: 2,
      title: "Visi",
      textId: "visi",
      image: "/foto1.jpg",
      content:
        "Menjadi perusahaan teknologi terdepan di Indonesia yang memberikan solusi digital inovatif, efisien, dan berkelanjutan.",
    },
    {
      id: 3,
      title: "Misi",
      textId: "misi",
      image: "/foto2.jpg",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Mengembangkan produk digital berkualitas tinggi</li>
          <li>Memberikan solusi tepat guna untuk tiap klien</li>
          <li>Berinovasi mengikuti perkembangan teknologi</li>
          <li>Menjaga profesionalisme dan integritas</li>
          <li>Memberdayakan talenta digital lokal</li>
        </ul>
      ),
    },
  ];

  return (
    <section
      id="tentang-kami"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6 md:px-12"
    >
      {/* Background 3D Elements */}
      <div className="absolute inset-0">
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
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Tentang Kami
        </h2>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-10 mb-20`}
          >
            {/* Gambar */}
            <div className="md:w-60 mt-20">
              <img
                src={section.image}
                alt={section.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Teks dengan ID khusus */}
            <div className="md:w-1/2" id={section.textId}>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                {section.title}
              </h3>
              <div className="text-slate-200 leading-relaxed text-sm">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient overlay (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default About;
