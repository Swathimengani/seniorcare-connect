const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  registerCaregiver,
  getVerifiedCaregivers,
  updateAvailability,
} = require("../controllers/caregiver.controller");

const router = express.Router();

// ✅ Public/User view verified caregivers
router.get("/", getVerifiedCaregivers);

// ✅ Caregiver registration
router.post("/register", protect, allowRoles("CAREGIVER"), registerCaregiver);

// ✅ Update availability
router.put("/availability", protect, allowRoles("CAREGIVER"), updateAvailability);

module.exports = router;
