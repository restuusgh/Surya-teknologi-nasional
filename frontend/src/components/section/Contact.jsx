import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
            Kontak Kami
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut atau konsultasi mengenai
            layanan yang kami sediakan.
          </p>
        </div>

        {/* Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Kontak */}
          <form className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama anda"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email anda"
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pesan
              </label>
              <textarea
                rows="5"
                placeholder="Tulis pesan anda..."
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              Kirim Pesan
            </button>
          </form>

          {/* Info Kontak */}
          <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
              Informasi Kontak
            </h3>
            <p className="text-gray-600 mb-6">
              Anda bisa menghubungi kami melalui form atau langsung lewat
              informasi berikut:
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>
                📍 Jalan Sawah Kurung nomor 4A
                Ciateul, Kec. Regol, Kota Bandung, Jawa Barat 40252
              </li>
              <li>
                📞 Telepon:  +62 822-1514-3520
              </li>
              <li>
                ✉️ Email: info@suryateknologi.co.id
              </li>
              <li>
                Website:  https://suryateknologi.co.id/
              </li>
              <li>
                jam buka: Senin - Jum'at 09:00 - 17:00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
