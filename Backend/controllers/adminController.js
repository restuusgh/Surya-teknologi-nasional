const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Portfolio = require('../models/Portfolio');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password || '');
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(admin);
    res.json({ token, admin: { id: admin.id, email: admin.email, firstName: admin.firstName, lastName: admin.lastName } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PRODUCTS CRUD
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;
    const p = await Product.create({ name, description, price, stock, image });
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    await p.update(req.body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    await p.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PORTFOLIO CRUD
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const p = await Portfolio.create({ title, description, image });
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const p = await Portfolio.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Portfolio not found' });
    await p.update(req.body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const p = await Portfolio.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Portfolio not found' });
    await p.destroy();
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
