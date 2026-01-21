import rateLimit, { ipKeyGenerator } from "express-rate-limit"; 
// 🔄 PERUBAHAN: tambah ipKeyGenerator

// 🔐 limiter khusus chatbot
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Terlalu banyak pesan. Silakan tunggu sebentar."
  },
  keyGenerator: (req) => ipKeyGenerator(req), 
  // PERUBAHAN
});

// limiter IP umum
export const ipLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => ipKeyGenerator(req), 
  //  PERUBAHAN
  message: "Terlalu banyak request dari IP ini. Coba lagi nanti.",
});

// limiter email
export const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) =>
    req.body?.email || ipKeyGenerator(req),
  //  PERUBAHAN
  message: "Terlalu banyak request dari email ini. Coba lagi nanti.",
});
