import Admin from "../models/Admin.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(admin);

    return res.json({
      message: "Login berhasil",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: `${admin.firstName} ${admin.lastName}`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
