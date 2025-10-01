import Admin from "../models/Admin.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const verificationCodes = {}; 

// Kirim kode verifikasi login
export const loginWithEmailCode = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = code;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
    });

    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Kode Verifikasi Login",
      text: `Kode verifikasi kamu adalah: ${code}`,
    });

    res.json({ message: "Kode verifikasi dikirim ke email" });
  } catch (error) {
    console.error("Gagal kirim kode verifikasi:", error);
    res.status(500).json({ message: "Gagal mengirim email" });
  }
};

// Verifikasi kode
export const verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (verificationCodes[email] === verificationCode) {
    delete verificationCodes[email];

    const admin = await Admin.findOne({ where: { email } });
    if (!admin){
        return res.status(401).json({message:"Admin tidak ditemukan"});
    }

    const token = generateToken(admin);

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: `${admin.firstName} ${admin.lastName}`,
      },
    });
  } else {
    return res.status(400).json({ message: "Kode verifikasi salah" });
  }
};
