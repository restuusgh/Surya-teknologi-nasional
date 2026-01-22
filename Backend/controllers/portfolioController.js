import Portfolio from "../models/Portfolio.js";

// CREATE
export const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ ALL
export const getPortfolios = async (req, res) => {
  try {
    const data = await Portfolio.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ DETAIL
export const getPortfolioById = async (req, res) => {
  try {
    const data = await Portfolio.findByPk(req.params.id);
    if (!data) return res.status(404).json({ success: false });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updatePortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findByPk(req.params.id);
    if (!data) return res.status(404).json({ success: false });

    await data.update(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deletePortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findByPk(req.params.id);
    if (!data) return res.status(404).json({ success: false });

    await data.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
