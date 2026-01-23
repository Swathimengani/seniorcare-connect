const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const router = express.Router();

// ✅ Public (anyone can view)
router.get("/", getAllServices);

// ✅ Admin only
router.post("/create", protect, allowRoles("ADMIN"), createService);
router.put("/:serviceId", protect, allowRoles("ADMIN"), updateService);
router.delete("/:serviceId", protect, allowRoles("ADMIN"), deleteService);

module.exports = router;
