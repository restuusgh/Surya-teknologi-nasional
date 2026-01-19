import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Settings,
  Headset,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/services";
const WA_NUMBER = "6281214777390";

const iconMap = {
  "Perangkat Lunak": <Globe size={36} />,
  "Sistem Parkir": <Settings size={36} />,
  "Sistem Ticketing": <Headset size={36} />,
  "Gate Perumahan": <ShieldCheck size={36} />,
};

const Layanan = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);
      } else if (Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= CREATE =================
  const handleAdd = async () => {
    if (!title || !description) {
      alert("Judul dan deskripsi wajib diisi");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        whatsappMessage: `Halo, saya tertarik dengan layanan ${title}`,
      }),
    });

    setTitle("");
    setDescription("");
    fetchServices();
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchServices();
  };

  // ================= CTA =================
  const openWA = (msg) => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // ================= LOADING =================
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Iklan Layanan</h1>
        <p className="text-slate-400">
          Kelola layanan perusahaan dengan tampilan iklan interaktif
        </p>
      </motion.div>

      {/* FORM TAMBAH */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 mb-12">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} /> Tambah Layanan
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="bg-slate-900 p-3 rounded-lg outline-none"
            placeholder="Judul layanan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="bg-slate-900 p-3 rounded-lg outline-none md:col-span-2"
            placeholder="Deskripsi layanan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition"
        >
          Simpan
        </button>
      </div>

      {/* CARD LAYANAN */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(services) &&
          services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8"
            >
              <div className="mb-4 text-cyan-400">
                {iconMap[s.title] || <Globe size={36} />}
              </div>

              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm mb-6">
                {s.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => openWA(s.whatsappMessage)}
                  className="flex-1 bg-cyan-600 py-2 rounded-lg hover:bg-cyan-700 transition"
                >
                  Chat WhatsApp
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {services.length === 0 && (
        <p className="text-slate-400 text-center mt-10">
          Belum ada data layanan
        </p>
      )}
    </div>
  );
};

export default Layanan;
