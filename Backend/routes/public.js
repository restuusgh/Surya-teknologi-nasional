const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/products', publicController.getProducts);
router.get('/portfolio', publicController.getPortfolios);

module.exports = router;
