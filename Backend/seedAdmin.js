require('dotenv').config();
const sequelize = require('./config/database');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    const count = await Admin.count();
    if (count === 0) {
      const pwd = await bcrypt.hash('admin123', 10);
      await Admin.bulkCreate([
        { firstName: 'Dea', lastName: 'Admin', email: 'admin1@example.com', password: pwd },
        { firstName: 'Anisa', lastName: 'Admin', email: 'admin2@example.com', password: pwd }
      ]);
      console.log('Admin seeded (admin1@example.com / admin123)');
    } else {
      console.log('Admin already exists');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
