import rateLimit from "express-rate-limit";

// limiter chatbot
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Terlalu banyak pesan. Silakan tunggu sebentar."
  }
});

// limiter IP umum
export const ipLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Terlalu banyak request dari IP ini. Coba lagi nanti.",
});

// limiter email (tanpa keyGenerator custom)
export const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Terlalu banyak request. Coba lagi nanti.",
});
