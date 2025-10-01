import React from "react";
import { FaLaptopCode, FaCloud, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    icon: <FaLaptopCode />,
    title: "Perangkat Lunak Custom",
    description:
      "Membangun aplikasi web dan desktop yang scalable sesuai kebutuhan bisnis Anda.",
    path: "/layanan/perangkat-lunak",
  },
  {
    icon: <FaCloud />,
    title: "Sistem Parkir",
    description:
      "Memberikan layanan cloud yang aman dan efisien untuk penyimpanan dan pengelolaan data Anda.",
    path: "/layanan/sistem-parkir",
  },
  {
    icon: <FaMobileAlt />,
    title: "Sistem Ticketing",
    description:
      "Pengembangan aplikasi Android & iOS untuk memudahkan pelanggan mengakses layanan Anda.",
    path: "/layanan/sistem-ticketing",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6"
    >
      {/* Judul dan Deskripsi */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold">Layanan Kami</h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan teknologi yang dirancang untuk mendukung
          pertumbuhan bisnis Anda di era digital.
        </p>
      </div>

      {/* Grid Card */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {cardData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-cyan-500/10 hover:scale-105 transition-all duration-300 text-center"
          >
            <div className="text-cyan-400 text-5xl mb-6 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default Services;
