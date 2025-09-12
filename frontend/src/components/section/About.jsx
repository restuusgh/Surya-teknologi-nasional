import React from "react";

const About = () => {
  return (
    <section
      id="produk"
      className="bg-gray-50 py-16 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Gambar */}
        <div className="flex justify-center">
          <img
            src="public/bg-aboutme.jpg"
            alt="Tentang Kami"
            className="w-80 md:w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Teks */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
            Tentang Kami
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            <span className="font-semibold">Surya Teknologi Nasional</span> adalah
            perusahaan yang bergerak di bidang teknologi informasi dan digital
            solution. Kami berkomitmen untuk menghadirkan layanan terbaik
            mulai dari pengembangan aplikasi, layanan IT, hingga konsultasi
            digital untuk mendukung bisnis Anda agar lebih kompetitif di era
            modern.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Dengan tim profesional dan berpengalaman, kami selalu berusaha
            memberikan inovasi dan solusi yang tepat guna membantu setiap klien
            mencapai tujuan bisnis mereka.
          </p>

          <div className="mt-6">
            <a
              href="#services"
              className="px-6 py-3 rounded-full bg-indigo-700 text-white hover:bg-indigo-800"
            >
              Layanan Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
