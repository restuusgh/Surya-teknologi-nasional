import React from "react";
import { motion } from "framer-motion";
import { useProducts } from "../../context/ProductContext";

const fallbackImages = [
  "/automatic.jpg",
  "/automatic2.jpg",
  "/automatic3.jpg",
  "/dispenser.jpg",
  "/dispenser2.jpg",
  "/dispenser3.jpg",
  "/foto1.jpg",
  "/foto2.jpg",
  "/foto3.jpg",
  "/foto4.jpg",
  "/foto5.jpg",
  "/foto6.jpg",
  "/foto7.jpg",
];

const BarangKami = () => {
  const { products } = useProducts();

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Produk <span className="text-cyan-400">Kami</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 && (
            <p className="text-center text-slate-400 col-span-3">
              Produk belum tersedia
            </p>
          )}

          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="bg-slate-800 rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={p.image || fallbackImages[i % fallbackImages.length]}
                onError={(e) =>
                  (e.target.src = fallbackImages[i % fallbackImages.length])
                }
                className="bg-white h-64 w-full object-contain rounded-xl mb-4"
              />

              <h3 className="text-white font-bold text-xl">{p.name}</h3>
              <p className="text-slate-400 text-sm">{p.description}</p>

              <p className="text-cyan-400 font-semibold mt-3">
                Rp {Number(p.price).toLocaleString("id-ID")}
              </p>

              <button className="mt-4 bg-cyan-600 px-6 py-2 rounded-xl text-white">
                Beli Sekarang
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarangKami;
