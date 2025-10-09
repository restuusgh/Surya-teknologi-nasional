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
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5; 
  
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
  const windowMs = 24 * 60 * 60 * 1000; 
  const maxRequests = 3; 
  
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
  const windowMs = 60 * 60 * 1000; 
  const maxRequests = 3; 
  
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
    
    // Informasi keamanan
    const securityInfo = `
IP Address: ${req.ip || 'Unknown'}
User Agent: ${req.get('User-Agent') || 'Unknown'}
Timestamp: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
Device Fingerprint: ${req.body.deviceFingerprint ? req.body.deviceFingerprint.substring(0, 15) + '...' : 'N/A'}
    `.trim();
    
    
    // 1. EMAIL KE ADMIN 
    
    const adminMailOptions = {
      from: {
        name: 'Website Contact Form',
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_USER,
      replyTo: email, 
      subject: `🔔 Pesan Baru dari ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 20px auto; background: #f8fafc; padding: 20px;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✉️ Pesan Baru dari Website</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Surya Teknologi Nasional</p>
            </div>
            
            <!-- Content -->
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <!-- Pengirim -->
              <div style="margin-bottom: 20px; padding: 15px; background: #e0f2fe; border-left: 4px solid #0891b2; border-radius: 4px;">
                <p style="margin: 0; color: #0891b2; font-weight: bold; font-size: 12px; text-transform: uppercase;">👤 Pengirim</p>
                <h2 style="margin: 10px 0 0 0; color: #1e293b; font-size: 20px;">${name}</h2>
              </div>
              
              <!-- Email -->
              <div style="margin-bottom: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px;">
                <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase;">📧 Email</p>
                <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <!-- Pesan -->
              <div style="margin-bottom: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px;">
                <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">💬 Pesan</p>
                <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <!-- Button Reply -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: Pesan Anda ke Surya Teknologi Nasional" style="display: inline-block; background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%); color: white; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  📧 Balas Email Ini
                </a>
              </div>
              
              <!-- Security Info -->
              <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 12px; font-weight: bold; text-transform: uppercase;">🔒 Info Keamanan</p>
                <pre style="margin: 10px 0 0 0; color: #78350f; font-size: 11px; font-family: 'Courier New', monospace; white-space: pre-wrap; word-wrap: break-word;">${securityInfo}</pre>
              </div>
              
              <!-- Footer -->
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px; text-align: center;">
                ⏰ Diterima pada: <strong>${new Date().toLocaleString('id-ID', { 
                  timeZone: 'Asia/Jakarta',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</strong>
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };
    
    //  EMAIL AUTO-REPLY KE USER
    const userMailOptions = {
      from: {
        name: 'Surya Teknologi Nasional',
        address: process.env.EMAIL_USER
      },
      to: email, // Email user
      subject: 'Pesan Anda Telah Diterima - Surya Teknologi Nasional',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 20px auto;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Terima Kasih!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Pesan Anda telah kami terima</p>
            </div>
            
            <!-- Content -->
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <p style="color: #334155; font-size: 16px; margin-top: 0;">Halo <strong>${name}</strong>,</p>
              
              <p style="color: #64748b; line-height: 1.6; font-size: 15px;">
                Terima kasih telah menghubungi <strong style="color: #0891b2;">Surya Teknologi Nasional</strong>. 
                Pesan Anda telah kami terima dan tim kami akan segera menghubungi Anda dalam <strong>1x24 jam</strong>.
              </p>
              
              <!-- Ringkasan Pesan -->
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0891b2;">
                <p style="margin: 0; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: bold;">Ringkasan Pesan Anda:</p>
                <p style="margin: 10px 0 0 0; color: #334155; font-style: italic; line-height: 1.5;">"${message.length > 150 ? message.substring(0, 150) + '...' : message}"</p>
              </div>
              
              <!-- Quick Contact -->
              <div style="background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; color: #0891b2; font-weight: bold; font-size: 16px;">📞 Butuh Respons Lebih Cepat?</p>
                <p style="margin: 15px 0 0 0; color: #334155; line-height: 1.8;">
                  <strong>WhatsApp:</strong> <a href="https://wa.me/6282215143520" style="color: #0891b2; text-decoration: none; font-weight: 600;">+62 822-1514-3520</a><br>
                  <strong>Telepon:</strong> <span style="color: #334155; font-weight: 600;">+62 822-1514-3520</span><br>
                  <strong>Email:</strong> <a href="mailto:info@suryateknologi.co.id" style="color: #0891b2; text-decoration: none; font-weight: 600;">info@suryateknologi.co.id</a>
                </p>
              </div>
              
              <!-- Office Hours -->
              <div style="text-align: center; padding: 15px; background: #fef3c7; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⏰ Jam Operasional:</strong> Senin - Jumat, 09:00 - 17:00 WIB
                </p>
              </div>
              
              <!-- Footer -->
              <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; line-height: 1.6;">
                Email ini dikirim otomatis, mohon tidak membalas email ini.<br>
                Untuk pertanyaan lebih lanjut, silakan hubungi kami melalui kontak di atas.<br><br>
                © ${new Date().getFullYear()} <strong>Surya Teknologi Nasional</strong><br>
                Jl. Sawah Kurung No.4A, Bandung, Jawa Barat
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };
    

    // KIRIM KEDUA EMAIL

    console.log('Sending email to admin...');
    await transporter.sendMail(adminMailOptions);
    console.log('Email sent to admin:', process.env.EMAIL_USER);
    
    console.log('Sending auto-reply to user...');
    await transporter.sendMail(userMailOptions);
    console.log('Auto-reply sent to user:', email);
    
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