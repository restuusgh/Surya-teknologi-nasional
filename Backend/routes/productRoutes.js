import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET semua produk
router.get("/", async (req, res) => {
  const products = await Product.findAll({ order: [["id", "ASC"]] });
  res.json(products);
});

// POST tambah produk
router.post("/", async (req, res) => {
  const { name, description, image, price } = req.body;

  const product = await Product.create({
    name,
    description,
    image,
    price: Number(price),
  });

  res.status(201).json(product);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
});

router.put("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.update(req.body);
  res.json(product);
});


export default router;
