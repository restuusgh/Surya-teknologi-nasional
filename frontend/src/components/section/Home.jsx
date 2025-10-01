import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Shield,
  Clock,
  Zap,
  Car,
  Monitor,
  Settings,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Play,
} from "lucide-react";
import PartnerSection from "../PartnerSection";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg"
            style={{
              animation: "floatShape 8s linear infinite",
            }}
          />
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full"
            style={{
              animation: "floatCircle 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-12 h-12 border border-emerald-400/40 rotate-45"
            style={{
              animation: "rotateShape 10s linear infinite",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Logo/Brand */}
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r rounded-lg flex items-center justify-center"></div>
                  <span className="text-2xl font-bold text-white">
                    Selamat Datang Di
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  PT.{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                    Surya Teknologi
                  </span>
                  <br />
                  Nasional
                </h1>

                {/* Subtitle */}
                <div className="text-xl lg:text-2xl text-slate-300 h-16 flex items-center">
                  <ReactTyped
                    strings={[
                      "Keamanan tingkat enterprise untuk kendaraan Anda",
                      "Perlindungan 24/7 dengan sistem cerdas",
                      "Pantau kendaraan dari mana saja",
                      "Solusi modern untuk keamanan transportasi",
                    ]}
                    typeSpeed={50}
                    backSpeed={30}
                    backDelay={2000}
                    loop={true}
                    showCursor={true}
                    cursorChar="|"
                  />
                </div>

                {/* Features Icons */}
                <div className="flex space-x-8">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Keamanan 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Akses Instan</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Eco-Friendly</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2"
                  >
                    <span>Login</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="group border-2 border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Lihat Layanan</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      {/* Layanan Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Layanan <span className="text-cyan-400">Kami</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Kami menyediakan berbagai solusi teknologi untuk memenuhi
              kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sistem Parkir */}
            <Link
              to="/services/parking-system"
              className="group text-center space-y-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8
          transition-all duration-300 transform hover:-translate-y-3 hover:scale-105
          hover:shadow-2xl hover:shadow-cyan-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-cyan-500/30"
            >
              <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-500/30 transition-all duration-300">
                <Car className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Sistem Parkir
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Solusi parkir otomatis dengan teknologi RFID dan sensor pintar
                untuk efisiensi maksimal dalam pengelolaan area parkir.
              </p>
              <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="font-medium">Pelajari Lebih Lanjut</span>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Aplikasi Custom */}
            <Link
              to="/services/software"
              className="group text-center space-y-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8
          transition-all duration-300 transform hover:-translate-y-3 hover:scale-105
          hover:shadow-2xl hover:shadow-blue-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-blue-500/30"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
                <Monitor className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Aplikasi Custom
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Pengembangan aplikasi sesuai kebutuhan bisnis dengan teknologi
                terdepan dan interface yang user-friendly.
              </p>
              <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="font-medium">Pelajari Lebih Lanjut</span>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>


            <Link
              to="/services/ticketing-system"
              className="group text-center space-y-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8
          transition-all duration-300 transform hover:-translate-y-3 hover:scale-105
          hover:shadow-2xl hover:shadow-emerald-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-emerald-500/30"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/30 transition-all duration-300">
                <Settings className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Sistem Ticketing
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Sistem tiket digital terintegrasi untuk berbagai jenis event,
                transportasi, dan manajemen antrian.
              </p>
              <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <span className="font-medium">Pelajari Lebih Lanjut</span>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Mengapa Memilih{" "}
              <span className="text-cyan-400">Surya Teknologi?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Kami memahami apa yang menjadi kebutuhan anda dan kami memberikan
              solusi untuk segala permasalahan anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Konsultasi Gratis */}
            <div
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 
            transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 
            hover:shadow-2xl hover:shadow-cyan-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-cyan-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Konsultasi Gratis
              </h3>
              <p className="text-slate-400">
                Konsultasi gratis untuk menentukan solusi terbaik sesuai
                kebutuhan bisnis Anda
              </p>
            </div>

            {/* Tim Berpengalaman */}
            <div
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 
            transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 
            hover:shadow-2xl hover:shadow-blue-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-blue-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Tim Berpengalaman
              </h3>
              <p className="text-slate-400">
                Tim berpengalaman lebih dari 5 tahun di bidang teknologi dan
                sistem keamanan
              </p>
            </div>

            {/* Support 24/7 */}
            <div
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 
            transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 
            hover:shadow-2xl hover:shadow-emerald-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-emerald-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Support 24/7</h3>
              <p className="text-slate-400">
                Support 24/7 untuk semua produk dengan tim teknis yang siap
                membantu
              </p>
            </div>

            {/* Garansi Resmi */}
            <div
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 
            transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 
            hover:shadow-2xl hover:shadow-purple-500/30 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-purple-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Garansi Resmi
              </h3>
              <p className="text-slate-400">
                Garansi dan maintenance berkala untuk menjaga performa optimal
                sistem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-bold text-cyan-400">100+</div>
              <div className="text-slate-400 text-lg">Proyek Selesai</div>
              <div className="text-sm text-slate-500">
                Berbagai jenis proyek teknologi
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-blue-400">5+</div>
              <div className="text-slate-400 text-lg">Tahun Pengalaman</div>
              <div className="text-sm text-slate-500">
                Dalam bidang teknologi
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-emerald-400">50+</div>
              <div className="text-slate-400 text-lg">Client Puas</div>
              <div className="text-sm text-slate-500">
                Dari berbagai sektor bisnis
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-purple-400">24/7</div>
              <div className="text-slate-400 text-lg">Support</div>
              <div className="text-sm text-slate-500">
                Siap membantu kapanpun
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Hubungi Kami</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Siap membantu mewujudkan solusi teknologi terbaik untuk kebutuhan
              bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Telepon */}
            <a
              href="https://wa.me/6282215143520"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 
        transition-all duration-300 block transform hover:-translate-y-3 hover:scale-105 
        hover:shadow-2xl hover:shadow-cyan-500/40 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-cyan-500/40"
            >
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Telepon</h3>
              <p className="text-slate-300 font-medium">+62 822-1514-3520</p>
              <p className="text-sm text-slate-400">
                Hubungi kami untuk konsultasi
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@suryateknologi.co.id"
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 
        transition-all duration-300 block transform hover:-translate-y-3 hover:scale-105 
        hover:shadow-2xl hover:shadow-blue-500/40 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-blue-500/40"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Email</h3>
              <p className="text-slate-300 font-medium">
                info@suryateknologi.co.id
              </p>
              <p className="text-sm text-slate-400">
                Kirim pertanyaan via email
              </p>
            </a>

            {/* Lokasi */}
            <a
              href="https://www.google.com/maps?q=Jl.+Sawah+Kurung+No.4A,+Bandung,+Jawa+Barat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center space-y-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 
        transition-all duration-300 block transform hover:-translate-y-3 hover:scale-105 
        hover:shadow-2xl hover:shadow-emerald-500/40 focus:-translate-y-3 focus:scale-105 focus:shadow-2xl focus:shadow-emerald-500/40"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Lokasi</h3>
              <p className="text-slate-300 font-medium">
                Jl. Sawah Kurung No.4A
              </p>
              <p className="text-sm text-slate-400">Bandung, Jawa Barat</p>
            </a>
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 
        text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <span>Hubungi Kami Sekarang</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes floatShape {
          0%, 100% { 
            transform: rotateX(0deg) rotateY(0deg) scale(1); 
          }
          25% { 
            transform: rotateX(90deg) rotateY(45deg) scale(1.1); 
          }
          50% { 
            transform: rotateX(180deg) rotateY(90deg) scale(1); 
          }
          75% { 
            transform: rotateX(270deg) rotateY(135deg) scale(1.1); 
          }
        }

        @keyframes floatCircle {
          0%, 100% { 
            transform: translateY(-20px) translateX(-10px) scale(1); 
          }
          50% { 
            transform: translateY(20px) translateX(10px) scale(1.2); 
          }
        }

        @keyframes rotateShape {
          0% { 
            transform: rotate(45deg) scale(1); 
          }
          50% { 
            transform: rotate(225deg) scale(1.3); 
          }
          100% { 
            transform: rotate(405deg) scale(1); 
          }
        }
      `}</style>
      <PartnerSection />
    </div>
  );
};

export default Home;
