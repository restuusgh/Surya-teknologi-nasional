import dotenv from "dotenv";
import sequelize from "./config/database.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

dotenv.config();

async function seed() {
  try {
    await sequelize.sync();

    const count = await Admin.count();

    if (count === 0) {
      const pwd = await bcrypt.hash("admin123", 10);

      await Admin.bulkCreate([
        {
          username: "deaadmin",
          firstName: "Dea",
          lastName: "Admin",
          email: "dea@gmail.com",
          password: pwd,
        },
                {
          username: "anisaadmin",
          firstName: "anisa",
          lastName: "Admin",
          email: "anisaedoh@gmail.com",
          password: pwd,
        },
      ]);

      console.log("Admin seeded");
      console.log("username: deaadmin | password: admin123");
    } else {
      console.log("Admin already exists");
    }

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
