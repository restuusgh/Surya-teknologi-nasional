import rateLimit from "express-rate-limit";

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
