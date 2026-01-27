import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/portfolios";

export default function PortfolioAdmin() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    client: "",
    location: "",
    year: "",
    category: "",
  });

  // ================= FETCH DATA =================
  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!form.title || !form.image) {
      alert("Judul & gambar wajib diisi");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      image: "",
      client: "",
      location: "",
      year: "",
      category: "",
    });

    setEditingId(null);
    fetchData();
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus portofolio ini?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm({
      title: p.title || "",
      description: p.description || "",
      image: p.image || "",
      client: p.client || "",
      location: p.location || "",
      year: p.year || "",
      category: p.category || "",
    });
    setEditingId(p.id);
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Kelola Portofolio</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-10 grid gap-4 max-w-2xl">
        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Nama file gambar (contoh: /Cikao-Gate.jpeg)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Klien"
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
        />

        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Lokasi"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Tahun"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />

        <input
          className="bg-slate-800 border border-slate-700 p-2 rounded"
          placeholder="Kategori"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {/* PREVIEW IMAGE */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-40 object-cover rounded border border-slate-700"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        )}

        <button
          onClick={handleSubmit}
          className={`py-2 rounded font-semibold ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {editingId ? "Update Portofolio" : "Simpan Portofolio"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 border border-white/10 rounded-lg overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover"
              onError={(e) => (e.target.src = "/no-image.png")}
            />

            <div className="p-4">
              <h3 className="font-semibold text-cyan-400">{p.title}</h3>
              <p className="text-sm text-slate-300 line-clamp-2">
                {p.description}
              </p>

              <div className="text-xs text-slate-400 mt-2">
                <p>Klien: {p.client || "-"}</p>
                <p>Tahun: {p.year || "-"}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-1 rounded text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
