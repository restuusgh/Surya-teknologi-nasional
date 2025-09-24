import Redis from "ioredis";
const redis = new Redis();

export const deviceCheck = async (req, res, next) => {
  const { visitorId } = req.body;
  if (!visitorId) {
    return res.status(400).json({ message: "Visitor ID diperlukan" });
  }

  // cek apakah device diblokir
  const blocked = await redis.get(`blocked:${visitorId}`);
  if (blocked) {
    return res.status(429).json({ message: "Device ini diblokir sementara." });
  }

  // hitung request
  const count = await redis.incr(`msg:${visitorId}`);
  if (count === 1) {
    await redis.expire(`msg:${visitorId}`, 60); // reset 1 menit
  }

  if (count > 5) {
    await redis.set(`blocked:${visitorId}`, "true", "EX", 3600); // blokir 1 jam
    return res.status(429).json({ message: "Terlalu banyak request dari device ini." });
  }

  next();
};
