// controllers/chatbotController.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Prompt khusus perusahaan kamu
const SYSTEM_PROMPT = `
Kamu adalah asisten AI perusahaan Surya Teknologi Nasional.
Jawablah hanya seputar perusahaan ini: layanan, keamanan parkir, teknologi, atau informasi umum.
Jika ditanya hal lain di luar topik, katakan dengan sopan bahwa kamu hanya menjawab tentang Surya Teknologi Nasional.
`;

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    // Batasi panjang pesan agar hemat kuota API
    if (message.length > 200) {
      return res
        .status(400)
        .json({ error: "Pesan terlalu panjang. Maksimal 200 karakter." });
    }

    const response = await fetch("https://free-chatgpt-api.p.rapidapi.com/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
      body: JSON.stringify({
        message: `${SYSTEM_PROMPT}\nUser: ${message}`,
      }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    // Pastikan data valid
    if (!data || !data.response) {
      return res
        .status(500)
        .json({ error: "Chatbot tidak merespons. Coba lagi nanti." });
    }

    res.json({ reply: data.response });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server chatbot." });
  }
};
