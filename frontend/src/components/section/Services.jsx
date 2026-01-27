import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/services";

const Services = () => {
  const { slug } = useParams(); // ambil category dari URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        let data = json.data || [];

        // 🔥 FILTER BERDASARKAN CATEGORY (DARI NAVBAR)
        if (slug) {
          data = data.filter(
            (s) =>
              s.title
                .toLowerCase()
                .replace(/\s+/g, "-") === slug
          );
        }

        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setServices([]);
        setLoading(false);
      });
  }, [slug]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading layanan...
      </div>
    );
  }

  // ================= EMPTY =================
  if (services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-500">
        Layanan tidak ditemukan
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold">
          {slug ? services[0].title : "Layanan Kami"}
        </h2>
        {!slug && (
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan teknologi untuk mendukung kebutuhan bisnis Anda.
          </p>
        )}
      </div>

      {/* CARD GRID */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* IMAGE */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm line-clamp-3">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
