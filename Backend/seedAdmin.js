import dotenv from "dotenv";
import sequelize from "./config/database.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

dotenv.config();

async function seed() {
  try {
    // JANGAN alter kalau production
    await sequelize.sync();

    const count = await Admin.count();

    if (count === 0) {
      const pwd = await bcrypt.hash("admin123", 10);

      await Admin.bulkCreate([
        {
          username: "deaadmin",
          firstName: "Dea",
          lastName: "Admin",
          email: "anisaedoh@gmail.com",
          password: pwd,
        },
        {
          username: "anisadmin",
          firstName: "Anisa",
          lastName: "Admin",
          email: "dclestary1804@gmail.com",
          password: pwd,
        },
      ]);

      console.log("Admin seeded:");
      console.log("username: deaadmin | password: admin123");
      console.log("username: anisadmin | password: admin123");
    } else {
      console.log("Admin already exists, skipping seed");
    }

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
