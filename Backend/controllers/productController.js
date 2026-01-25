import Product from "../models/Product.js";

/* ================= GET ================= */
export const getProducts = async (req, res) => {
  const products = await Product.findAll({ order: [["id", "ASC"]] });
  res.json(products);
};

/* ================= CREATE ================= */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    await product.update({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: req.file ? `/uploads/${req.file.filename}` : product.image,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
