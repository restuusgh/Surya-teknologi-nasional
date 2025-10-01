import Product from '../models/Product.js';
import Portfolio from '../models/Portfolio.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt','DESC']] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({ order: [['createdAt','DESC']] });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getProducts,
  getPortfolios
};