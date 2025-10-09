import express from "express";
import { sendContact, contactMiddleware } from "../controllers/contactController.js";

const router = express.Router();

// ⭐ Ubah dari "/contact" ke "/" saja
router.post("/", contactMiddleware, sendContact); 

// Route untuk rate limit status (opsional)
router.get("/limits/:identifier", (req, res) => {
  const { identifier } = req.params;
  const type = req.query.type;
  
  res.json({
    message: "Rate limit status endpoint",
    identifier: identifier,
    type: type
  });
});

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Contact route is working!" });
});

export default router;