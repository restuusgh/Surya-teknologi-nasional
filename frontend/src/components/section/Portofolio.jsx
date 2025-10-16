import React from "react";
import { Link } from "react-router-dom";
import projects from "../PortfolioDetail/portfolioData";

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Hasil Kerja Kami
        </h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Tepat Guna | Sesuai Tujuan dari Client Kami
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <Link to={`/portfolio/${project.id}`} key={project.id}>
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg shadow hover:shadow-cyan-500/30 transition hover:scale-105 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cyan-400">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default Portfolio;
