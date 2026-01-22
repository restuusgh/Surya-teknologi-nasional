// models/Service.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false, // ⚠️ WAJIB ADA
    },

    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    features: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("features");
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue("features", JSON.stringify(value));
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "services",
  }
);

export default Service;
