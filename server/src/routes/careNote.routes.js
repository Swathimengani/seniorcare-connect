const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const {
  createCareNote,
  getCareNotesByBooking,
} = require("../controllers/careNote.controller");

const router = express.Router();

// ✅ Caregiver adds note
router.post("/create", protect, allowRoles("CAREGIVER"), createCareNote);

// ✅ Anyone logged-in can view notes for booking
router.get("/:bookingId", protect, getCareNotesByBooking);

module.exports = router;
