import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "../../context/ProductContext";

const API_URL = "http://localhost:5000";

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

const ProductAdmin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    if (editId) {
      await updateProduct(editId, formData);
    } else {
      await addProduct(formData);
    }

    setForm({ name: "", description: "", price: "", image: null });
    setEditId(null);
  };

  return (
    <section className="p-10 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Manajemen Produk</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl mb-10 grid grid-cols-2 gap-4"
      >
        <input
          placeholder="Nama Produk"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 bg-slate-700 rounded"
          required
        />

        <input
          type="number"
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-3 bg-slate-700 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          className="p-3 bg-slate-700 rounded"
        />

        <input
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="p-3 bg-slate-700 rounded"
          required
        />

        <button className="col-span-2 bg-cyan-600 py-3 rounded font-semibold">
          {editId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* GRID PRODUK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={
                p.image
                  ? `${API_URL}${p.image}`
                  : fallbackImages[i % fallbackImages.length]
              }
              onError={(e) =>
                (e.target.src = fallbackImages[i % fallbackImages.length])
              }
              className="bg-white h-64 w-full object-contain rounded-xl mb-4"
            />

            <h3 className="text-white font-bold text-xl">
              {p.name || "Nama belum diisi"}
            </h3>

            <p className="text-slate-400 text-sm">
              {p.description || "Deskripsi belum tersedia"}
            </p>

            <p className="text-cyan-400 font-semibold mt-3">
              Rp {(Number(p.price) || 0).toLocaleString("id-ID")}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: p.name || "",
                    description: p.description || "",
                    price: String(p.price || ""),
                    image: null, // 🔑 JANGAN isi string
                  });
                  setEditId(p.id);
                }}
                className="flex-1 bg-yellow-500 py-2 rounded text-black"
              >
                Edit
              </button>

            <button
              type="button"
              onClick={() => {
                const yakin = window.confirm(
                  `Yakin ingin menghapus produk "${p.name}"?`
                );

                if (yakin) {
                  deleteProduct(p.id);
                }
              }}
              className="flex-1 bg-red-600 py-2 rounded"
            >
              Hapus
            </button>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductAdmin;
