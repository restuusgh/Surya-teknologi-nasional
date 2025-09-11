const Product = require('../models/Product');
const Portfolio = require('../models/Portfolio');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt','DESC']] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({ order: [['createdAt','DESC']] });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
