import sequelize from "./config/database.js";
import Product from "./models/Product.js";

const seedProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected for seeding");

    //  JANGAN DROP DATA
    await sequelize.sync();

    await Product.bulkCreate(
      [
        {
          name: "Automatic Barrier Gate MX 50",
          description: "Palang Parkir Otomatis",
          price: 12000000,
          image: "/automatic.jpg",
        },
        {
          name: "Automatic Barrier Gate MX Servo",
          description: "Palang Parkir Otomatis",
          price: 14000000,
          image: "/automatic2.jpg",
        },
        {
          name: "Automatic Barrier Gate Servo",
          description: "Palang Parkir Otomatis",
          price: 13500000,
          image: "/automatic3.jpg",
        },
        {
          name: "Dispenser Tiket LED",
          description: "Mesin Tiket Otomatis",
          price: 8000000,
          image: "/dispenser.jpg",
        },
        {
          name: "Dispenser Tiket Perumahan",
          description: "Mesin Tiket Otomatis",
          price: 7500000,
          image: "/dispenser2.jpg",
        },
        {
          name: "Tripod Turnstile",
          description: "Alat Pengendali Akses",
          price: 9500000,
          image: "/foto1.jpg",
        },
        {
          name: "Flap Barrier",
          description: "Sistem Pengendali Akses Otomatis",
          price: 16000000,
          image: "/foto2.jpg",
        },
        {
          name: "Swing Barrier",
          description: "Palang Parkir Otomatis dengan Motor Servo",
          price: 15000000,
          image: "/foto3.jpg",
        },
        {
          name: "Vehicle Loop Detector",
          description: "Sensor kendaraan untuk palang parkir otomatis",
          price: 1500000,
          image: "/foto4.jpg",
        },
        {
          name: "UHF Reader",
          description: "Pembaca kartu RFID jarak jauh",
          price: 3500000,
          image: "/foto5.jpg",
        },
        {
          name: "Controller MX 50",
          description: "Pengendali palang parkir otomatis",
          price: 2000000,
          image: "/foto6.jpg",
        },
        {
          name: "Controller Servo",
          description: "Pengendali motor servo untuk palang parkir",
          price: 2500000,
          image: "/foto7.jpg",
        },
      ],
      {
        ignoreDuplicates: true, //  data lama tidak dihapus
      }
    );

    console.log("✅ Produk berhasil dimasukkan ke database");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed gagal:", err);
    process.exit(1);
  }
};

seedProducts();
