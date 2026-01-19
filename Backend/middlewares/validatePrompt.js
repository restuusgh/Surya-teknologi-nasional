// =====================
// GREETINGS MAP
// =====================
const GREETING_RESPONSES = {
  pagi: "Selamat pagi ☀️😊",
  siang: "Selamat siang 🌤️😊",
  sore: "Selamat sore 🌇😊",
  malam: "Selamat malam 🌙😊"
};

const BASIC_GREETINGS = [
  "halo",
  "hai",
  "hi",
  "helo",
  "hello"
];

const ISLAMIC_GREETING = ["assalamualaikum"];

// =====================
// VALIDATE PROMPT
// =====================
export function validatePrompt(req, res, next) {
  const text = (req.body.message || req.body.question || "")
    .toLowerCase()
    .trim();

  // =====================
  // 1️⃣ EMPTY INPUT
  // =====================
  if (!text) {
    return res.json({
      text: "Hehe 😄 silakan ketik pesan atau pertanyaannya ya."
    });
  }

  // =====================
  // 2️⃣ ISLAMIC GREETING
  // =====================
  if (ISLAMIC_GREETING.some(g => text.startsWith(g))) {
    return res.json({
      text:
        "Waalaikumsalam 😊🙏 Saya asisten AI dari **Surya Technology Nasional**. Ada yang bisa saya bantu?"
    });
  }

  // =====================
  // 3️⃣ TIME-BASED GREETING
  // =====================
  for (const key in GREETING_RESPONSES) {
    if (text.includes(`selamat ${key}`) || text === key) {
      return res.json({
        text:
          `${GREETING_RESPONSES[key]} Saya asisten AI dari **Surya Technology Nasional**. Ada yang bisa saya bantu seputar layanan atau teknologi kami?`
      });
    }
  }

  // =====================
  // 4️⃣ BASIC GREETING
  // =====================
  if (BASIC_GREETINGS.some(g => text === g || text.startsWith(g))) {
    return res.json({
      text:
        "Halo! 👋😊 Saya asisten AI dari **Surya Technology Nasional**. Ada yang bisa saya bantu?"
    });
  }

  // =====================
  // 5️⃣ ALLOW ALL QUESTIONS
  // =====================
  // Jangan blok user, semua diarahkan lewat system prompt
  next();
}
