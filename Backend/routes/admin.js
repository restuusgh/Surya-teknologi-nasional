const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protectAdmin } = require('../middlewares/auth');

// login (no token required)
router.post('/login', adminController.login);

// product CRUD (protected)
router.post('/products', protectAdmin, adminController.createProduct);
router.put('/products/:id', protectAdmin, adminController.updateProduct);
router.delete('/products/:id', protectAdmin, adminController.deleteProduct);

// portfolio CRUD (protected)
router.post('/portfolio', protectAdmin, adminController.createPortfolio);
router.put('/portfolio/:id', protectAdmin, adminController.updatePortfolio);
router.delete('/portfolio/:id', protectAdmin, adminController.deletePortfolio);

module.exports = router;
