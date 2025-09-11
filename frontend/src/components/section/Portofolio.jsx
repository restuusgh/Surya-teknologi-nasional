import React from "react";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Website E-Commerce",
      img: "portfolio1.png",
    },
    {
      id: 2,
      title: "Aplikasi Mobile Banking",
      img: "portfolio2.png",
    },
    {
      id: 3,
      title: "Sistem Cloud ERP",
      img: "portfolio3.png",
    },
    {
      id: 4,
      title: "Dashboard Analitik",
      img: "portfolio4.png",
    },
  ];

  return (
    <section id="portfolio" className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
          Portofolio 
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Beberapa proyek yang telah kami kerjakan untuk membantu klien mencapai
          kesuksesan bisnis mereka.
        </p>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-800">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
