import nodemailer from "nodemailer";

export const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    // Transporter pakai Gmail (App Password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email ke perusahaan
    await transporter.sendMail({
      from: `"Form Kontak Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // supaya bisa langsung reply ke pengirim
      subject: `Pesan baru dari ${name}`,
      text: `
        Nama: ${name}
        Email: ${email}
        Pesan: ${message}
      `,
      html: `
        <h3>Pesan Baru dari Website</h3>
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Pesan:</b> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Pesan berhasil dikirim ✅" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Gagal mengirim pesan ❌" });
  }
};
