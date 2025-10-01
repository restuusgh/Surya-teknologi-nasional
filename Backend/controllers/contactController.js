import nodemailer from "nodemailer";
import axios from "axios";

// In-memory storage (gunakan Redis untuk production)
const rateLimitStore = new Map();
const deviceStore = new Map();
const emailLimitStore = new Map();

// Helper function untuk membersihkan expired records
const cleanupExpiredRecords = () => {
  const now = Date.now();
  
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
  
  for (const [key, value] of emailLimitStore.entries()) {
    if (now > value.resetTime) {
      emailLimitStore.delete(key);
    }
  }
  
  for (const [key, value] of deviceStore.entries()) {
    if (now > value.lastSeen + (24 * 60 * 60 * 1000)) {
      deviceStore.delete(key);
    }
  }
};

// Jalankan cleanup setiap 5 menit
setInterval(cleanupExpiredRecords, 5 * 60 * 1000);

// Manual input validation
const validateInput = (req, res, next) => {
  const { name, email, message, deviceFingerprint } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Nama diperlukan');
  } else if (name.trim().length < 2 || name.trim().length > 50) {
    errors.push('Nama harus 2-50 karakter');
  } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.push('Nama hanya boleh huruf dan spasi');
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email diperlukan');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      errors.push('Format email tidak valid');
    }
  }

  // Validate message
  if (!message || typeof message !== 'string') {
    errors.push('Pesan diperlukan');
  } else if (message.trim().length < 10 || message.trim().length > 1000) {
    errors.push('Pesan harus 10-1000 karakter');
  }

  // Validate device fingerprint (OPTIONAL - generate jika tidak ada)
  if (deviceFingerprint && typeof deviceFingerprint === 'string') {
    if (deviceFingerprint.length < 10) {
      errors.push('Device fingerprint tidak valid');
    } else {
      req.body.deviceFingerprint = deviceFingerprint.trim();
    }
  } else {
    // Generate fallback fingerprint dari IP + User Agent
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'unknown';
    req.body.deviceFingerprint = `fallback-${Buffer.from(ip + userAgent).toString('base64').substring(0, 20)}`;
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Input tidak valid",
      details: errors
    });
  }

  // Sanitize inputs
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.message = message.trim();

  next();
};

// Rate limiter untuk IP
const ipRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 jam
  const maxRequests = 5; // 5 pesan per jam per IP
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
      firstRequest: now
    });
    return next();
  }
  
  const record = rateLimitStore.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    record.firstRequest = now;
  } else {
    record.count++;
  }
  
  if (record.count > maxRequests) {
    const timeLeft = Math.ceil((record.resetTime - now) / 1000 / 60);
    return res.status(429).json({
      error: `Terlalu banyak pesan dari IP ini. Coba lagi dalam ${timeLeft} menit.`,
      retryAfter: timeLeft
    });
  }
  
  rateLimitStore.set(ip, record);
  next();
};

// Rate limiter untuk Email
const emailRateLimit = (req, res, next) => {
  const email = req.body.email;
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 jam
  const maxRequests = 3; // 3 pesan per hari per email
  
  if (!emailLimitStore.has(email)) {
    emailLimitStore.set(email, {
      count: 1,
      resetTime: now + windowMs,
      firstRequest: now
    });
    return next();
  }
  
  const record = emailLimitStore.get(email);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    record.firstRequest = now;
  } else {
    record.count++;
  }
  
  if (record.count > maxRequests) {
    const timeLeft = Math.ceil((record.resetTime - now) / 1000 / 60 / 60);
    return res.status(429).json({
      error: `Email ini sudah mengirim terlalu banyak pesan. Coba lagi dalam ${timeLeft} jam.`,
      retryAfter: timeLeft * 60
    });
  }
  
  emailLimitStore.set(email, record);
  next();
};

// Device Fingerprint checker
const deviceFingerprintLimit = (req, res, next) => {
  const fingerprint = req.body.deviceFingerprint;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 jam
  const maxRequests = 3; // 3 pesan per jam per device
  
  if (!deviceStore.has(fingerprint)) {
    deviceStore.set(fingerprint, {
      count: 1,
      resetTime: now + windowMs,
      lastSeen: now,
      emails: new Set([req.body.email]),
      ips: new Set([req.ip])
    });
    return next();
  }
  
  const record = deviceStore.get(fingerprint);
  record.lastSeen = now;
  record.emails.add(req.body.email);
  record.ips.add(req.ip);
  
  // Suspicious activity: same device, multiple emails/IPs
  if (record.emails.size > 3 || record.ips.size > 2) {
    return res.status(429).json({
      error: "Aktivitas mencurigakan terdeteksi. Akses ditolak.",
      blocked: true
    });
  }
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }
  
  if (record.count > maxRequests) {
    const timeLeft = Math.ceil((record.resetTime - now) / 1000 / 60);
    return res.status(429).json({
      error: `Device ini sudah mengirim terlalu banyak pesan. Coba lagi dalam ${timeLeft} menit.`,
      retryAfter: timeLeft
    });
  }
  
  deviceStore.set(fingerprint, record);
  next();
};

// Google reCAPTCHA verifier
const verifyRecaptcha = async (req, res, next) => {
  const recaptchaToken = req.body.recaptchaToken;
  
  // Skip verification jika tidak ada RECAPTCHA_SECRET_KEY (development mode)
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.log('Warning: RECAPTCHA_SECRET_KEY not set, skipping verification');
    return next();
  }
  
  // Skip jika tidak ada token
  if (!recaptchaToken) {
    console.log('Warning: No reCAPTCHA token provided, skipping verification');
    return next();
  }
  
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
          remoteip: req.ip
        }
      }
    );
    
    const { success, score } = response.data;
    
    if (!success) {
      console.log('reCAPTCHA verification failed:', response.data['error-codes']);
      return res.status(400).json({
        error: "reCAPTCHA verification failed.",
        details: response.data['error-codes']
      });
    }
    
    // Untuk reCAPTCHA v3, periksa score
    if (score && score < 0.5) {
      console.log('reCAPTCHA score too low:', score);
      return res.status(400).json({
        error: "reCAPTCHA score terlalu rendah. Kemungkinan aktivitas bot.",
        score: score
      });
    }
    
    console.log('reCAPTCHA verified successfully, score:', score);
    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error.message);
    // Skip on error untuk development
    console.log('Skipping reCAPTCHA due to error');
    next();
  }
};

// Main contact handler
export const sendContact = async (req, res) => {
  const { name, email, message } = req.body;
  
  console.log('Processing contact form submission:', { name, email });
  
  try {
    // Transporter pakai Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Email ke perusahaan dengan informasi keamanan
    const securityInfo = `
      IP Address: ${req.ip}
      User Agent: ${req.get('User-Agent')}
      Timestamp: ${new Date().toISOString()}
      Device Fingerprint: ${req.body.deviceFingerprint.substring(0, 10)}...
    `;
    
    await transporter.sendMail({
      from: `"Form Kontak Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Pesan baru dari ${name}`,
      text: `
        Nama: ${name}
        Email: ${email}
        Pesan: ${message}
        
        Info Keamanan:
        ${securityInfo}
      `,
      html: `
        <h3>Pesan Baru dari Website</h3>
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Pesan:</b> ${message}</p>
        
        <hr>
        <small>
          <b>Info Keamanan:</b><br>
          ${securityInfo.replace(/\n/g, '<br>')}
        </small>
      `,
    });
    
    console.log('Email sent successfully to:', process.env.EMAIL_USER);
    
    res.status(200).json({ 
      success: true,
      message: "Pesan berhasil dikirim",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      error: "Gagal mengirim pesan",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Export middleware
export const contactMiddleware = [
  validateInput,
  ipRateLimit,
  emailRateLimit,
  deviceFingerprintLimit,
  verifyRecaptcha
];