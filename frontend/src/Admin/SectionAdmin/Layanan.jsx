import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Settings,
  Headset,
  ShieldCheck,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/services";
const WA_NUMBER = "6281214777390";

// ICON berdasarkan judul
const iconMap = {
  "Perangkat Lunak": <Globe size={36} />,
  "Sistem Parkir": <Settings size={36} />,
  "Sistem Ticketing": <Headset size={36} />,
  "Gate Perumahan": <ShieldCheck size={36} />,
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

export default function Layanan() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== FORM TAMBAH =====
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // ===== FORM EDIT =====
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");

  // ===== FETCH =====
  const fetchServices = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setServices(json.data || []);
    } catch (err) {
      console.error(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ===== CREATE (FIXED: IMAGE WAJIB) =====
  const handleAdd = async () => {
    if (!title || !description || !image) {
      alert("Judul, deskripsi, dan gambar wajib diisi!");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image,
        whatsappMessage: `Halo, saya tertarik dengan layanan ${title}`,
      }),
    });

    setTitle("");
    setDescription("");
    setImage("");
    fetchServices();
  };

  // ===== OPEN EDIT =====
  const openEdit = (s) => {
    setEditId(s.id);
    setEditTitle(s.title);
    setEditDescription(s.description);
    setEditImage(s.image);
  };

  // ===== UPDATE =====
  const handleUpdate = async () => {
    if (!editTitle || !editDescription || !editImage) {
      alert("Semua field wajib diisi");
      return;
    }

    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        image: editImage,
        whatsappMessage: `Halo, saya tertarik dengan layanan ${editTitle}`,
      }),
    });

    setEditId(null);
    fetchServices();
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchServices();
  };

  // ===== WA =====
  const openWA = (msg) => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading layanan...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Kelola Layanan</h1>
      <p className="text-slate-400 mb-8">
        Manajemen layanan perusahaan
      </p>

      {/* FORM TAMBAH */}
      <div className="bg-slate-800 p-6 rounded-xl mb-10">
        <h2 className="flex items-center gap-2 mb-4 font-semibold">
          <Plus size={18} /> Tambah Layanan
        </h2>

        <div className="grid gap-4">
          <input
            className="bg-slate-900 p-3 rounded"
            placeholder="Judul layanan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="bg-slate-900 p-3 rounded"
            placeholder="Deskripsi layanan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="bg-slate-900 p-3 rounded"
            placeholder="URL / path gambar (WAJIB)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {image && (
            <img
              src={image}
              alt="preview"
              className="h-40 object-cover rounded border border-slate-700"
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
          )}

          <button
            onClick={handleAdd}
            className="bg-cyan-600 py-2 rounded hover:bg-cyan-700"
          >
            Simpan Layanan
          </button>
        </div>
      </div>

      {/* FORM EDIT */}
      {editId && (
        <div className="bg-slate-800 p-6 rounded-xl mb-10 border border-yellow-500">
          <h2 className="font-semibold mb-4">Edit Layanan</h2>

          <input
            className="bg-slate-900 p-3 rounded mb-3 w-full"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            className="bg-slate-900 p-3 rounded mb-3 w-full"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <input
            className="bg-slate-900 p-3 rounded mb-3 w-full"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-black px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditId(null)}
              className="bg-slate-700 px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* LIST CARD */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800 rounded-xl overflow-hidden"
          >
            <img
              src={s.image || DEFAULT_IMAGE}
              alt={s.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-5">
              <div className="text-cyan-400 mb-2">
                {iconMap[s.title] || <Globe size={36} />}
              </div>

              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-slate-400 mb-4">
                {s.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => openWA(s.whatsappMessage)}
                  className="flex-1 bg-cyan-600 py-2 rounded"
                >
                  WhatsApp
                </button>

                <button
                  onClick={() => openEdit(s)}
                  className="bg-yellow-500/20 p-2 rounded"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500/20 p-2 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <p className="text-center text-slate-400 mt-10">
          Belum ada layanan
        </p>
      )}
    </div>
  );
}
