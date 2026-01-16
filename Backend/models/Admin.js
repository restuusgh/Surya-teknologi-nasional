import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define("Admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // username harus unik
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Admin;
