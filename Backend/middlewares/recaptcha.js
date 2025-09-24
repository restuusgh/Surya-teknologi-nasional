import axios from "axios";


export const verifyCaptcha = async (req, res, next) => {
  try {
    const { token } = req.body;
    const secret = process.env.RECAPTCHA_SECRET;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    );

    if (!response.data.success) {
      return res.status(400).json({ message: "Verifikasi CAPTCHA gagal" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Error verifikasi CAPTCHA" });
  }
};
