import React from "react";

const projects = [
  { id: 1, title: "Cikao Park Purwakarta", img: "/Cikao-Gate.jpeg" },
  { id: 2, title: "Le Giant Pool & Bar", img: "/Pintu Masuk Pool.jpg" },
  { id: 3, title: "Perumahan Katapang", img: "/Katapang.jpg" },
  { id: 4, title: "RS Permata Cirebon", img: "/RSUD-Permata.jpg" },
  { id: 5, title: "Perbaikan Sistem RSUD Gunung Jati", img: "/RSUD.jpg" },
  { id: 6, title: "Area 52 Studio", img: "/area52studio.png" },
  { id: 7, title: "Batik Putri Pratiwi", img: "/Batik-Pratiwi.png" },
  { id: 8, title: "Sistem Informasi Perusahaan", img: "/CMS.png" },
  { id: 9, title: "GOR Cinde Itenas", img: "/GOR-CINDE.jpeg" },
  { id: 10, title: "Ultima Parkir Garut", img: "/ULTIMA-PG.jpeg" },
  { id: 11, title: "Masjid As-Sa'diah Sumedang", img: "/MESJID-SUMEDANG.jpeg" },
  { id: 12, title: "Cianjur City Park", img: "/Cianjur.jpeg" },
  { id: 13, title: "Mentari Permai Residence", img: "/Mentari-depan.jpeg" },
  { id: 14, title: "Taman Lalu Lintas Bandung", img: "/14.jpg" },
  { id: 15, title: "Pelabuhan Angke DKI Jakarta", img: "/15.jpg" },
  { id: 16, title: "Pelabuhan Ciwandan Banten", img: "/16.jpg" },
  { id: 17, title: "Pelabuhan Panjang Bandar Lampung", img: "/17.jpg" },
  { id: 18, title: "Perumahan Fajar Cimahi", img: "/18.jpg" },
  { id: 19, title: "Air Mancur Sribaduga Purwakarta", img: "/19.jpg" },
  { id: 20, title: "Bamboorasa Bandung", img: "/20.jpg" },
  { id: 21, title: "Gedung ABG Bandung", img: "/21.jpg" },
  { id: 22, title: "Metro Penthouse Metro Bandung", img: "/22.jpg" },
  { id: 23, title: "Pelabuhan Bengkulu", img: "/23.jpg" },
  { id: 24, title: "Pengadilan Militer Bandung", img: "/24.jpg" },
  { id: 25, title: "Plaza Cirende Tanggerang Selatan", img: "/25.jpg" },
  { id: 26, title: "PT Hino Motor Purwakarta", img: "/26.jpg" },
  { id: 27, title: "RS Guntur Garut", img: "/27.png" },
  { id: 28, title: "RSUD Cibabat Cimahi", img: "/28.jpg" },
  { id: 29, title: "Singosari Estate Cimahi", img: "/29.jpg" },
  { id: 30, title: "Redwood TKI V Bandung", img: "/30.jpg" },
];

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

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg shadow hover:shadow-cyan-500/30 transition hover:scale-105 overflow-hidden"
            >
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
          ))}
        </div>
      </div>

      {/* Bottom Gradient Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default Portfolio;
