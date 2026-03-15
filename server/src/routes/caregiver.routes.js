const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const Caregiver = require("../models/Caregiver.model");

const {
  registerCaregiver,
  getVerifiedCaregivers,
  updateAvailability,
} = require("../controllers/caregiver.controller");

const router = express.Router();

// ✅ Public
router.get("/", getVerifiedCaregivers);

// ✅ Get my caregiver profile
router.get("/me", protect, allowRoles("CAREGIVER"), async (req, res) => {
  try {
    const caregiver = await Caregiver.findOne({ userId: req.user._id });

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver profile not found" });
    }

    res.status(200).json(caregiver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Register caregiver profile
router.post("/register", protect, allowRoles("CAREGIVER"), registerCaregiver);

// ✅ Update availability
router.put("/availability", protect, allowRoles("CAREGIVER"), updateAvailability);

module.exports = router;