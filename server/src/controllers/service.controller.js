const Service = require("../models/Service.model");

// ✅ Get all services (Public)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "Services fetched ✅", services });
  } catch (error) {
    return res.status(500).json({ message: "Fetch services error", error: error.message });
  }
};

// ✅ Create service (Admin only)
const createService = async (req, res) => {
  try {
    const { name, description, durationType, basePrice, requiredQualification } = req.body;

    if (!name || !durationType || !basePrice) {
      return res.status(400).json({ message: "Name, durationType and basePrice are required" });
    }

    const service = await Service.create({
      name,
      description: description || "",
      durationType,
      basePrice,
      requiredQualification: requiredQualification || "",
    });

    return res.status(201).json({ message: "Service created ✅", service });
  } catch (error) {
    return res.status(500).json({ message: "Create service error", error: error.message });
  }
};

// ✅ Update service (Admin only)
const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const updated = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service updated ✅", service: updated });
  } catch (error) {
    return res.status(500).json({ message: "Update service error", error: error.message });
  }
};

// ✅ Delete service (Admin only)
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const deleted = await Service.findByIdAndDelete(serviceId);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Delete service error", error: error.message });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
