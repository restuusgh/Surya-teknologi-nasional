import React from "react";

const BarangKami = () => {
  const barangList = [
    {
      id: 1,
      name: "Laptop Pro X1",
      description: "Laptop performa tinggi untuk kebutuhan bisnis dan gaming.",
      image: "https://via.placeholder.com/300x200?text=Laptop+Pro+X1",
    },
    {
      id: 2,
      name: "Smartphone Z5",
      description: "Smartphone canggih dengan kamera 108MP dan baterai tahan lama.",
      image: "https://via.placeholder.com/300x200?text=Smartphone+Z5",
    },
    {
      id: 3,
      name: "Headset UltraSound",
      description: "Headset dengan kualitas suara jernih dan bass bertenaga.",
      image: "https://via.placeholder.com/300x200?text=Headset+UltraSound",
    },
  ];

  return (
    <section id="barangkami" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
          Barang Kami
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {barangList.map((barang) => (
            <div
              key={barang.id}
              className="bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col items-center"
            >
              <img
                src={barang.image}
                alt={barang.name}
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-indigo-700">
                {barang.name}
              </h3>
              <p className="text-gray-600 mt-2 text-center">
                {barang.description}
              </p>
              <button className="mt-4 px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition">
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarangKami;
