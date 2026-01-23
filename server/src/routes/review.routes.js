const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

const { createReview, getCaregiverReviews } = require("../controllers/review.controller");

const router = express.Router();

// ✅ User submits review
router.post("/create", protect, allowRoles("USER"), createReview);

// ✅ Public: get reviews of caregiver
router.get("/caregiver/:caregiverId", getCaregiverReviews);

module.exports = router;
