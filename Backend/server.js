require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const path = require('path');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static uploads (jika ada)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mount routes
app.use('/api', publicRoutes);       // GET /api/products, /api/portfolio
app.use('/api/admin', adminRoutes);  // POST /api/admin/login, and protected CRUD

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // ensure tables exist (will create Admin/Product/Portfolio models)
    await sequelize.sync({ alter: true });
    console.log('DB synced');

    app.listen(PORT, () => console.log(`Server is ready, running on ${PORT}`));
  } catch (err) {
    console.error('Start failed:', err);
    process.exit(1);
  }
}

start();
