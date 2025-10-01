// controllers/adminController.js
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Portfolio from '../models/Portfolio.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/auth.js';

/**
 * =======================
 *   AUTHENTICATION ADMIN
 * =======================
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari admin berdasarkan email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Bandingkan password dengan bcrypt
    const match = await bcrypt.compare(password, admin.password || '');
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(admin);

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * =======================
 *        PRODUCTS
 * =======================
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * =======================
 *       PORTFOLIOS
 * =======================
 */
const createPortfolio = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const portfolio = await Portfolio.create({
      title,
      description,
      image,
    });

    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    await portfolio.update(req.body);
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    await portfolio.destroy();
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * =======================
 *    EXPORT CONTROLLER
 * =======================
 */
export default {
  login,
  createProduct,
  updateProduct,
  deleteProduct,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
