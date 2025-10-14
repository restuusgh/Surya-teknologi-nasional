import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Globe, Send, User, MessageCircle, Shield, AlertCircle } from "lucide-react";

// Inline config to avoid import issues in demo
const config = {
  recaptchaSiteKey: "6LfrV9MrAAAAALTe7EdBKP1vpAESZZ-fyxaJnODA",
  apiUrl: import.meta.env.VITE_API_URL
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true);
          window.grecaptcha.execute(config.recaptchaSiteKey, {
            action: 'contact'
          }).then(token => {
            setRecaptchaToken(token);
          }).catch(err => {
            console.error("reCAPTCHA error:", err);
          });
        });
      }
    };

    // Add reCAPTCHA script if not exists
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${config.recaptchaSiteKey}`;
      script.addEventListener('load', loadRecaptcha);
      script.addEventListener('error', () => {
        console.error("Failed to load reCAPTCHA");
        setStatus("Gagal memuat reCAPTCHA. Silakan refresh halaman.");
      });
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status when user types
    if (status) setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus("Mengirim...");

    try {
      // Refresh reCAPTCHA token
      let token = recaptchaToken;
      
      if (window.grecaptcha && recaptchaLoaded) {
        try {
          token = await window.grecaptcha.execute(
            config.recaptchaSiteKey, 
            { action: 'contact' }
          );
        } catch (err) {
          console.error("reCAPTCHA execution error:", err);
          setStatus("Gagal memverifikasi reCAPTCHA");
          setIsSubmitting(false);
          return;
        }
      }

      console.log("Sending request to:", `${config.apiUrl}/api/contact`);
      
      const res = await fetch(`${config.apiUrl}/api/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });

      console.log("Response status:", res.status);
      
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        setStatus("Pesan berhasil dikirim");
        setFormData({ name: "", email: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(data.error || `Gagal mengirim pesan (${res.status}) `);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      
      // More specific error messages
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setStatus("Tidak dapat terhubung ke server. Pastikan backend berjalan di localhost:5000");
      } else {
        setStatus(`Terjadi kesalahan: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6"
    >
      {/* Background Animasi */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              i % 4 === 0 ? 'bg-cyan-400/20' :
              i % 4 === 1 ? 'bg-blue-500/20' :
              i % 4 === 2 ? 'bg-emerald-400/20' : 'bg-purple-400/20'
            } rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* Konten Contact */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hubungi <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kami</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-slate-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tertarik dengan layanan kami? Hubungi kami untuk konsultasi gratis dan informasi lebih lanjut tentang solusi teknologi yang kami tawarkan.
          </motion.p>
        </div>

        {/* Grid 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Kontak */}
          <motion.div
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-cyan-400" />
              Kirim Pesan
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap anda"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan alamat email anda"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Pesan
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan atau pertanyaan anda..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </motion.button>

              {status && (
                <motion.div
                  className={`mt-4 p-4 rounded-xl border ${
                    status.includes('✅') 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    {status.includes('✅') ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <p className="text-sm font-medium">{status}</p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Info Kontak + Google Maps */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Google Maps */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-80 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.741593369948!2d107.60805667499339!3d-6.921851267758037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e85b7d6b1f4f%3A0x5a9a62f6d4c5b3f4!2sJl.%20Sawah%20Kurung%20No.4A%2C%20Ciateul%2C%20Kec.%20Regol%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040252!5e0!3m2!1sid!2sid!4v1694512345678!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(85%)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Surya Teknologi Nasional"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* Informasi Kontak */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-cyan-400" />
                Informasi Kontak
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Alamat</p>
                    <p className="text-white font-medium">Jl. Sawah Kurung No.4A, Bandung</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Telepon</p>
                    <p className="text-white font-medium">+62 822-1514-3520</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Email</p>
                    <p className="text-white font-medium">info@suryateknologi.co.id</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Website</p>
                    <a 
                      href="https://suryateknologi.co.id/" 
                      className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      suryateknologi.co.id
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Jam Operasional</p>
                    <p className="text-white font-medium">Senin - Jumat: 09:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
