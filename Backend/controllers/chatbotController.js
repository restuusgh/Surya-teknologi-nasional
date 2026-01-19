export function validatePrompt(req, res, next) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  if (message.length > 500) {
    return res.status(400).json({
      error: 'Message terlalu panjang (max 500 karakter)'
    });
  }

  const forbidden = ['hack', 'bypass', 'exploit'];
  if (forbidden.some(word => message.toLowerCase().includes(word))) {
    return res.status(403).json({
      error: 'Pertanyaan tidak diizinkan'
    });
  }

  next();
}
