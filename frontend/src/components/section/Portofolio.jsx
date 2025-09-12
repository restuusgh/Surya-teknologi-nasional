import React from "react";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Cikao Park Purwakarta",
      img: "public/Cikao-Gate.jpeg",
    },
      {
      id: 2,
      title: "Le Giant Pool & Bar",
      img: "public/Pintu Masuk Pool.jpg",
    },
      {
      id: 3,
      title: "Perumahan Katapang",
      img: "public/Katapang.jpg",
    },
      {
      id: 4,
      title: "RS Permata Cirebon",
      img: "public/RSUD-permata.jpg",
    },
      {
      id: 5,
      title: "Perbaikan Sistem RSUD Gunung Jati",
      img: "public/RSUD.jpg",
    },
      {
      id: 6,
      title: "Area 52 Studio",
      img: "public/area52studio.png",
    },
      {
      id: 7,
      title: "Batik Putri Pratiwi",
      img: "public/Batik-Pratiwi.png",
    },
        {
      id: 8,
      title: "Sistem Informasi Perusahaan",
      img: "public/CMS.png",
    },
      {
      id: 9,
      title: "GOR Cinde Itenas",
      img: "public/GOR-CINDE.jpeg",
    },
      {
      id: 10,
      title: "Ultima Parkir Garut",
      img: "public/ULTIMA-PG.jpeg",
    },
      {
      id: 11,
      title: "Masjid As-Sa'diah Sumedang",
      img: "public/MESJID-SUMEDANG.jpeg",
    },
      {
      id: 12,
      title: "Cianjur City Park",
      img: "Cianjur.jpeg",
    },
      {
      id: 13,
      title: "Mentari Permai Residence",
      img: "public/Mentari-depan.jpeg",
    },
      {
      id: 14,
      title: "Taman Lalu Lintas Bandung",
      img: "public/14.jpg",
    },
      {
      id: 15,
      title: "Pelabuhan Angke DKI Jakarta",
      img: "public/15.jpg",
    },
      {
      id: 16,
      title: "Pelabuhan Ciwandan Banten",
      img: "public/16.jpg",
    },
      {
      id: 17,
      title: "Pelabuhan Panjang Bandar Lampung",
      img: "public/17.jpg",
    },
      {
      id: 18,
      title: "Perumahan Fajar Cimahi",
      img: "public/18.jpg",
    },
      {
      id: 19,
      title: "Air Mancur Sribaduga Purwakarta",
      img: "public/19.jpg",
    },
      {
      id: 20,
      title: "Bamboorasa Bandung",
      img: "public/20.jpg",
    },
      {
      id: 21,
      title: "Gedung ABG Bandung",
      img: "public/21.jpg",
    },
      {
      id: 22,
      title: "Metro Penthouse Metro Bandung",
      img: "public/22.jpg",
    },
      {
      id: 23,
      title: "Pelabuhan Bengkulu",
      img: "public/23.jpg",
    },
      {
      id: 24,
      title: "Pengadilan Militer Bandung",
      img: "public/24.jpg",
    },
      {
      id: 25,
      title: "Plaza Cirende Tanggerang Selatan",
      img: "public/25.jpg",
    },
      {
      id: 26,
      title: "PT Hino Motor Purwakarta",
      img: "public/26.jpg",
    },
      {
      id: 27,
      title: "RS Guntur Garut",
      img: "public/27.png",
    },
      {
      id: 28,
      title: "RSUD Cibabat Cimahi",
      img: "public/28.jpg",
    },
      {
      id: 29,
      title: "Singosari Estate Cimahi",
      img: "public/29.jpg",
    },
      {
      id: 30,
      title: "Redwood TKI V Bandung",
      img: "public/30.jpg",
    },
  ];

  return (
    <section id="portfolio" className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
          Hasil Kerja Kami 
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Tepat Guna | Sesua Tujuan dari Client Kami
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