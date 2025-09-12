import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // status feedback

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Mengirim...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Pesan berhasil dikirim ✅");
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        setStatus(data.error || "Gagal mengirim pesan ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("Terjadi kesalahan server ❌");
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-indigo-900"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Kontak Kami
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hubungi kami untuk informasi lebih lanjut atau konsultasi mengenai
            layanan yang kami sediakan.
          </motion.p>
        </div>

        {/* Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Kontak */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama anda"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email anda"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pesan
              </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tulis pesan anda..."
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              Kirim Pesan
            </button>

            {status && (
              <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
            )}
          </motion.form>

          {/* Info Kontak + Google Maps */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md flex flex-col space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-indigo-800">
              Informasi Kontak
            </h3>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.741593369948!2d107.60805667499339!3d-6.921851267758037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e85b7d6b1f4f%3A0x5a9a62f6d4c5b3f4!2sJl.%20Sawah%20Kurung%20No.4A%2C%20Ciateul%2C%20Kec.%20Regol%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040252!5e0!3m2!1sid!2sid!4v1694512345678!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Perusahaan"
              ></iframe>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li>📞 Telepon: +62 822-1514-3520</li>
              <li>✉ Email: info@suryateknologi.co.id</li>
              <li>
                🌐 Website:{" "}
                <a
                  href="https://suryateknologi.co.id/"
                  className="text-indigo-600 hover:underline"
                >
                  suryateknologi.co.id
                </a>
              </li>
              <li>🕒 Jam buka: Senin - Jum'at 09:00 - 17:00</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
