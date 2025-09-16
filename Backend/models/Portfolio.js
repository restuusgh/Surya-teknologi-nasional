import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Portfolio = sequelize.define('Portfolio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING }
}, {
  tableName: 'portfolios',
  timestamps: true
});

export default Portfolio;