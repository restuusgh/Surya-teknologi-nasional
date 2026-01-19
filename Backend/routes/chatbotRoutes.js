import express from 'express';
import { chatWithOllama } from '../service/botServices.js';
import { validatePrompt } from '../middlewares/validatePrompt.js';
import { chatLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.post(
  '/',
  chatLimiter,
  validatePrompt,
  async (req, res) => {
    try {
      const { message } = req.body;

      const reply = await chatWithOllama(message);

      res.status(200).json({
        success: true,
        reply
      });
    } catch (error) {
      console.error('[CHAT ERROR]', error);
      res.status(500).json({
        success: false,
        error: 'Gagal memproses permintaan'
      });
    }
  }
);

export default router;
