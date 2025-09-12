import React from "react";

const SistemTicketing= () => {
  const product = {
    name: "SistemTicketing",
    description:
      "Kami menawarkan layanan pengembangan perangkat lunak custom berbasis web & desktop. Layanan ini cocok untuk bisnis yang ingin sistem digital sesuai kebutuhan spesifik.",
    image: "/your-software-image.jpg", // Ganti sesuai gambar yang tersedia
    price: "Harga sesuai proyek",
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-indigo-600 font-semibold text-lg">{product.price}</p>
        </div>
      </div>
    </section>
  );
};

export default SistemTicketing;
