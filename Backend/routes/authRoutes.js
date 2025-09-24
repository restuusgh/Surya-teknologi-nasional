import express from "express";
import { loginWithEmailCode, verifyCode } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginWithEmailCode);   // endpoint kirim kode verifikasi
router.post("/verify", verifyCode);          // endpoint verifikasi kode

export default router;
