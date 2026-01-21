const config = {
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || "fallback-key",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
};

export default config;
