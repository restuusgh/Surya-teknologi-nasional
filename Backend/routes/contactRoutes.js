import express from "express";
import { sendContact, contactMiddleware } from "../controllers/contactController.js";

const router = express.Router();

// Route dengan security middleware
router.post("/contact", contactMiddleware, sendContact);

// Route untuk mendapatkan rate limit status (opsional)
router.get("/contact/limits/:identifier", (req, res) => {
  const { identifier } = req.params;
  const type = req.query.type; // 'ip', 'email', atau 'device'
  
  // Implementasi sederhana untuk cek status rate limit
  // Dalam production, ini harus lebih secure
  res.json({
    message: "Rate limit status endpoint",
    identifier: identifier,
    type: type
  });
});

export default router;