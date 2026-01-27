import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api/portfolios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(json => setProjects(json.data || []));
  }, []);

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">Hasil Kerja Kami</h2>
        <p className="text-slate-400 mt-2">
          Tepat Guna | Sesuai Tujuan dari Client Kami
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((p) => (
            <Link to={`/portfolio/${p.id}`} key={p.id}>
              <div className="bg-white/10 rounded-lg overflow-hidden hover:scale-105 transition">
                
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => e.target.src = "/no-image.png"}
                />

                <div className="p-4">
                  <h3 className="text-cyan-400 font-semibold">
                    {p.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
