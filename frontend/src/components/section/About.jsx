import React from "react";

const About = () => {
  const sections = [
    {
      id: 1,
      title: "Sejarah Kami",
      textId: "sejarah",
      image: "/logostn.png",
      content:
        "Surya Teknologi Nasional didirikan pada tahun 2010 dengan semangat membangun transformasi digital. Kami terus berkembang untuk menjadi mitra solusi digital terbaik di Indonesia.",
    },
    {
      id: 2,
      title: "Visi",
      textId: "visi",
      image: "/foto1.jpg",
      content:
        "Menjadi perusahaan teknologi terdepan di Indonesia yang memberikan solusi digital inovatif, efisien, dan berkelanjutan.",
    },
    {
      id: 3,
      title: "Misi",
      textId: "misi",
      image: "/foto2.jpg",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Mengembangkan produk digital berkualitas tinggi</li>
          <li>Memberikan solusi tepat guna untuk tiap klien</li>
          <li>Berinovasi mengikuti perkembangan teknologi</li>
          <li>Menjaga profesionalisme dan integritas</li>
          <li>Memberdayakan talenta digital lokal</li>
        </ul>
      ),
    },
  ];

  return (
    <section id="tentang-kami" className="py-20 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Tentang Kami</h2>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-10 mb-20`}
          >
            {/* Gambar */}
            <div className="md:w-60 mt-20">
              <img
                src={section.image}
                alt={section.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Teks dengan ID khusus */}
            <div className="md:w-1/2" id={section.textId}>
              <h3 className="text-2xl font-semibold text-orange-600 mb-4">{section.title}</h3>
              <div className="text-gray-700 leading-relaxed text-sm">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
