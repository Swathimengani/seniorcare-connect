const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  getPendingCaregivers,
  verifyCaregiver,
  rejectCaregiver,
  getAllBookings,
  assignCaregiverToBooking,
} = require("../controllers/admin.controller");

const router = express.Router();

// ================== CAREGIVER MANAGEMENT ==================
router.get(
  "/caregivers/pending",
  protect,
  allowRoles("ADMIN"),
  getPendingCaregivers
);

router.put(
  "/caregivers/:caregiverId/verify",
  protect,
  allowRoles("ADMIN"),
  verifyCaregiver
);

router.put(
  "/caregivers/:caregiverId/reject",
  protect,
  allowRoles("ADMIN"),
  rejectCaregiver
);

// ================== BOOKING MANAGEMENT ==================
router.get(
  "/bookings",
  protect,
  allowRoles("ADMIN"),
  getAllBookings
);

router.patch(
  "/bookings/:bookingId/assign",
  protect,
  allowRoles("ADMIN"),
  assignCaregiverToBooking
);

module.exports = router;
