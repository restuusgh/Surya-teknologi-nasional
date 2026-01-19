// models/Service.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Icon name or URL",
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: "Array of features for this service",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "services",
    timestamps: true,
  }
);

export default Service;