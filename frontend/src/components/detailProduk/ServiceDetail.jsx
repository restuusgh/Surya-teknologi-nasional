import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/services";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const ServiceDetail = () => {
  const { id } = useParams(); // contoh: sistem-parkir
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || res;

        const found = data.find(
          (s) =>
            String(s.id) === id || slugify(s.title) === id
        );

        setService(found || null);
      })
      .catch((err) => {
        console.error(err);
        setService(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="p-10 text-center text-red-500">
        Layanan tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      <img
        src={service.image}
        alt={service.title}
        className="rounded-xl shadow-lg w-full object-cover"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">
          {service.title}
        </h1>
        <p className="text-slate-600 mb-6">
          {service.description}
        </p>

        <a
          href={`https://wa.me/6281214777390?text=${encodeURIComponent(
            service.whatsappMessage || `Halo saya tertarik dengan ${service.title}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ServiceDetail;
