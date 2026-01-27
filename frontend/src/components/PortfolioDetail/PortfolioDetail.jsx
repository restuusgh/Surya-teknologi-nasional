import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/portfolios";

export default function PortfolioDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(json => setData(json.data));
  }, [id]);

  if (!data) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-slate-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* JUDUL */}
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          {data.title}
        </h1>

        {/* GAMBAR UTAMA */}
        <div className="mb-10">
          <img
            src={data.image}
            alt={data.title}
            className="w-full max-h-[420px] object-cover rounded-xl border border-white/10"
            onError={(e) => e.target.src = "/no-image.png"}
          />
        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-slate-300">
          <p><b>Klien:</b> {data.client || "-"}</p>
          <p><b>Tahun:</b> {data.year || "-"}</p>
          <p><b>Lokasi:</b> {data.location || "-"}</p>
          <p><b>Kategori:</b> {data.category || "-"}</p>
        </div>

        {/* DESKRIPSI */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Deskripsi
          </h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* FITUR */}
        {data.features && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Fitur Utama
            </h2>
            <ul className="list-disc list-inside text-slate-300">
              {data.features.split(",").map((f, i) => (
                <li key={i}>{f.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        {/* TEKNOLOGI */}
        {data.technologies && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Teknologi yang Digunakan
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.technologies.split(",").map((t, i) => (
                <span
                  key={i}
                  className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BACK */}
        <Link
          to="/portfolio"
          className="inline-block bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition"
        >
          ← Kembali ke Daftar Portofolio
        </Link>

      </div>
    </section>
  );
}
