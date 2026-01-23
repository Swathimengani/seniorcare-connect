const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  createBooking,
  getMyBookings,
  getCaregiverBookings,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
} = require("../controllers/booking.controller");

const router = express.Router();

// ✅ User routes
router.post("/create", protect, allowRoles("USER"), createBooking);
router.get("/my", protect, allowRoles("USER"), getMyBookings);

// ✅ Caregiver routes
router.get("/caregiver", protect, allowRoles("CAREGIVER"), getCaregiverBookings);
router.put("/:bookingId/accept", protect, allowRoles("CAREGIVER"), acceptBooking);
router.put("/:bookingId/reject", protect, allowRoles("CAREGIVER"), rejectBooking);
router.put("/:bookingId/status", protect, allowRoles("CAREGIVER"), updateBookingStatus);

module.exports = router;
