import rateLimit from "express-rate-limit";

// 🔐 limiter khusus chatbot
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 10, // max 10 chat / menit / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Terlalu banyak pesan. Silakan tunggu sebentar."
  }
});

// limiter lain (punya kamu)
export const ipLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.ip,
  message: "Terlalu banyak request dari IP ini. Coba lagi nanti.",
});

export const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Terlalu banyak request dari email ini. Coba lagi nanti.",
});
