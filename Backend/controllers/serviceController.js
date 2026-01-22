// controllers/serviceController.js
import Service from "../models/Service.js";

/* ================= CREATE ================= */
export const createService = async (req, res) => {
  try {
    const { title, description, image, icon, features } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "title, description, dan image wajib diisi",
      });
    }

    const service = await Service.create({
      title,
      description,
      image,
      icon,
      features: features || [],
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= READ ALL ================= */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= READ BY ID ================= */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updateService = async (req, res) => {
  try {
    const { title, description, image, icon, features } = req.body;
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await service.update({
      title,
      description,
      image,
      icon,
      features,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await service.destroy();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
