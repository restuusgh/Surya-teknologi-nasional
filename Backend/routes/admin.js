import express from 'express';
import adminController from '../controllers/adminController.js';
import { protectAdmin } from '../middlewares/auth.js';

const router = express.Router();


router.post('/login', adminController.login);


router.post('/products', protectAdmin, adminController.createProduct);
router.put('/products/:id', protectAdmin, adminController.updateProduct);
router.delete('/products/:id', protectAdmin, adminController.deleteProduct);


router.post('/portfolio', protectAdmin, adminController.createPortfolio);
router.put('/portfolio/:id', protectAdmin, adminController.updatePortfolio);
router.delete('/portfolio/:id', protectAdmin, adminController.deletePortfolio);

export default router;