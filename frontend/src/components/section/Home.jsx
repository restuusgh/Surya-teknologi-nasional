import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('public/background.jpg')" }} // ganti dengan gambar kamu
    >
      {/* Overlay gelap supaya teks lebih terbaca */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Konten */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Selamat Datang di{" "}
          <span className="text-yellow-300">Surya Teknologi Nasional</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          kami menjadi solusi untuk segala permasalah anda
        </p>

        
      </div>
    </section>
  );
};

export default Home;
