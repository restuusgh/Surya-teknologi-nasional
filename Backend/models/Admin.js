import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define("Admin", {
<<<<<<< HEAD
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
=======
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
>>>>>>> 3211f147c6e7bd58024ba3e6d9dd233306592635
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Admin;
