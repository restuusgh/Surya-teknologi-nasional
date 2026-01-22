import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Portfolio = sequelize.define("Portfolio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,

  client: DataTypes.STRING,
  location: DataTypes.STRING,
  year: DataTypes.STRING,
  category: DataTypes.STRING,

  image: DataTypes.STRING,      // gambar utama
  images: DataTypes.JSON,       // MULTI GAMBAR

}, {
  timestamps: true,
});
export default Portfolio;