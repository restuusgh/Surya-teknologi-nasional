import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "", logo: "Logo-ABG.png" },
  { name: "", logo: "legiant.png" },
  { name: "", logo: "Logo-Darbeni.png" },
  { name: "", logo: "Logo-iLugroup.png" },
  { name: "", logo: "Logo-Katapang.png" },
  { name: "", logo: "Logo-Masjid-As-Sadidiah.png" },
];

const PartnerSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="container mx-auto text-center">
        <h3 className="text-sm text-slate-400 uppercase tracking-widest">
          Mereka yang percaya kepada kami
        </h3>
        <h2 className="text-3xl font-bold text-white mb-6">Partner Kami</h2>

        {/* Divider */}
        <div className="flex items-center justify-center mb-8">
          <span className="w-24 border-t border-slate-600"></span>
          <span className="mx-3 text-cyan-400">⚙️</span>
          <span className="w-24 border-t border-slate-600"></span>
        </div>

        {/* Logo Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="marquee">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="partner-item"
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }} 
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .partner-item {
          margin-right: 4rem; 
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%); 
          }
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
