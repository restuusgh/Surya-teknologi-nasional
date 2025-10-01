import express from 'express';
import publicController from '../controllers/publicController.js';

const router = express.Router();

router.get('/products', publicController.getProducts);
router.get('/portfolio', publicController.getPortfolios);

export default router;