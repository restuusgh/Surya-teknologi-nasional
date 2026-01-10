import React from "react";

const PerangkatLunak = () => {
  const product = {
    name: "Perangkat Lunak Custom",
    description:
      "Kami menyediakan layanan pembuatan perangkat lunak custom berbasis web dan desktop. Solusi ini dirancang khusus untuk perusahaan atau individu yang membutuhkan sistem digital sesuai kebutuhan operasional mereka.",
    image: "/your-software-image.jpg", // Ganti sesuai path gambar kamu
    price: "Harga sesuai proyek",
  };

  return (
    <section className="min-h-screen flex flex-col justify-between bg-white">
      <div className="flex-grow py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-xl shadow-\\\\lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-indigo-800 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-indigo-600 font-semibold text-lg">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerangkatLunak;
