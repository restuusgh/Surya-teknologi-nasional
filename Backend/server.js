import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contactRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk"; 
import authRoutes from "./routes/authRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api", publicRoutes); 
app.use("/api/admin", adminRoutes); 
app.use("/api", contactRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log(chalk.blue("DB connected"));

    await sequelize.sync({ alter: true });
    console.log(chalk.blue("DB synced"));

    app.listen(PORT, () =>
      console.log(chalk.green(`Server is ready, running on ${PORT}`))
    );
  } catch (err) {
    console.error(chalk.red("Start failed:"), err);
    process.exit(1);
  }
}

start();
