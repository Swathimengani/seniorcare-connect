const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  getPendingCaregivers,
  verifyCaregiver,
  rejectCaregiver,
} = require("../controllers/admin.controller");

const router = express.Router();

// ✅ Admin only routes
router.get("/caregivers/pending", protect, allowRoles("ADMIN"), getPendingCaregivers);
router.put("/caregivers/:caregiverId/verify", protect, allowRoles("ADMIN"), verifyCaregiver);
router.put("/caregivers/:caregiverId/reject", protect, allowRoles("ADMIN"), rejectCaregiver);

module.exports = router;
