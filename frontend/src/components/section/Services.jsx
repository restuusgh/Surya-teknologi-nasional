import React from "react";
import { FaLaptopCode, FaCloud, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
          Layanan Kami
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan teknologi yang dirancang untuk
          mendukung pertumbuhan bisnis Anda di era digital.
        </p>

        {/* Cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div
            className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/layanan/perangkat-lunak")}
          >
            <div className="text-indigo-700 text-4xl mb-4 flex justify-center">
              <FaLaptopCode />
            </div>
            <h3 className="text-xl font-semibold text-indigo-800">
              Perangkat Lunak Custom
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Membangun aplikasi web dan desktop yang scalable sesuai kebutuhan
              bisnis Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
          onClick={() => navigate("/layanan/sistem-parkir")}>
            <div className="text-indigo-700 text-4xl mb-4 flex justify-center">
              <FaCloud />
            </div>
            <h3 className="text-xl font-semibold text-indigo-800">
              Sistem Parkir
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Memberikan layanan cloud yang aman dan efisien untuk penyimpanan
              dan pengelolaan data Anda.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
          onClick={() => navigate("/layanan/sistem-ticketing")}>
            <div className="text-indigo-700 text-4xl mb-4 flex justify-center">
              <FaMobileAlt />
            </div>
            <h3 className="text-xl font-semibold text-indigo-800">
              Sistem Ticketing
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Pengembangan aplikasi Android & iOS untuk memudahkan pelanggan
              mengakses layanan Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;