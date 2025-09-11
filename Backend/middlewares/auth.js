const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

function generateToken(admin) {
  return jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function protectAdmin(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) return res.status(401).json({ message: 'Admin not found' });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

module.exports = { protectAdmin, generateToken };
