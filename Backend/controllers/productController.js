import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
