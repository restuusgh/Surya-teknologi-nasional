import React from "react";

const SistemParkir = () => {
  const product = {
    name: "SistemParkir",
    description:
      "Kami menawarkan layanan pengembangan perangkat lunak custom berbasis web & desktop. Layanan ini cocok untuk bisnis yang ingin sistem digital sesuai kebutuhan spesifik.",
    image: "/your-software-image.jpg", 
    price: "Harga sesuai proyek",
  };

  return (
    <section className="min-h-screen flex flex-col justify-between bg-white">
      <div className="flex-grow py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-indigo-800 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-indigo-600 font-semibold text-lg">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SistemParkir;
