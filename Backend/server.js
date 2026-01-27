import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";



import productRoutes from "./routes/productRoutes.js"; 


import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import morgan from "morgan";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolios", portfolioRoutes);

app.use("/api/products", productRoutes); 


// Error handler
app.use((err, req, res, next) => {
  console.error(chalk.red("Error:"), err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log(chalk.blue("Database connected"));

    await sequelize.sync();
    console.log(chalk.blue("Database synced"));

    app.listen(PORT, () => {
      console.log(chalk.green(`Server running on port ${PORT}`));
    });
  } catch (err) {
    console.error(chalk.red("Start failed:"), err);
    process.exit(1);
  }
}

start();

export default app;
