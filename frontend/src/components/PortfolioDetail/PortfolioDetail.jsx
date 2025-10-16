import React from "react";
import { useParams, Link } from "react-router-dom";
import portfolioData from "../PortfolioDetail/portfolioData";

const PortfolioDetail = () => {
    const { id } = useParams();
    const selected = portfolioData.find((item) => item.id === id);

    if (!selected) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                Data portfolio tidak ditemukan.
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6">
            <div className="max-w-5xl mx-auto bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl p-8">
                {/* Judul Proyek */}
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {selected.detailTitle || selected.title}
                </h2>

                {/* Info Proyek */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 mb-10 text-center sm:text-left">
                    <p><span className="font-semibold text-cyan-400">Klien:</span> {selected.client}</p>
                    <p><span className="font-semibold text-cyan-400">Tahun Selesai:</span> {selected.year}</p>
                    <p><span className="font-semibold text-cyan-400">Lokasi:</span> {selected.location}</p>
                    <p><span className="font-semibold text-cyan-400">Kategori:</span> {selected.category}</p>
                </div>

                {/* Gambar proyek */}

                {(selected.detailImg?.length > 0 ? selected.detailImg : selected.img).length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 justify-center">
                        {(selected.detailImg?.length > 0 ? selected.detailImg : selected.img).map((img, index) => (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={img}
                                    alt={`${selected.title}-${index}`}
                                    className="w-80 h-56 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                )}


                {/* Deskripsi */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-2">Deskripsi</h3>
                    <p className="text-slate-300 leading-relaxed text-justify whitespace-pre-line">
                        {selected.description}
                    </p>
                </div>

                {/* Fitur */}
                {selected.features?.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-2">Fitur Utama</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {selected.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Teknologi */}
                {selected.technologies?.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                            Teknologi yang Digunakan
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selected.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-slate-700 text-cyan-300 text-sm rounded-full font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tombol Kembali */}
                <div className="flex justify-center">
                    <Link
                        to="/portfolio"
                        className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                        ← Kembali ke Daftar Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetail;
