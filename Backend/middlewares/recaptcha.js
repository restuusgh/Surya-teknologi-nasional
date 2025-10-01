import axios from 'axios';

export const recaptchaValidation = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  // Skip reCAPTCHA di development
  if (process.env.NODE_ENV === 'development' && !recaptchaToken) {
    return next();
  }

  if (!recaptchaToken) {
    return res.status(400).json({
      error: "reCAPTCHA token diperlukan."
    });
  }

  try {
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    
    const response = await axios.post(verificationURL);
    const data = response.data;

    if (!data.success) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed. Please try again."
      });
    }

    // reCAPTCHA score check (optional)
    if (data.score < 0.5) {
      console.warn('Low reCAPTCHA score:', data.score);
    }

    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      error: "Error verifying reCAPTCHA. Please try again."
    });
  }
};