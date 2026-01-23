const Review = require("../models/Review.model");
const Booking = require("../models/Booking.model");
const Caregiver = require("../models/Caregiver.model");

// ✅ Create review (User only)
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ message: "bookingId and rating are required" });
    }

    // Check booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the same user can review their booking
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to review this booking" });
    }

    // Booking must be completed
    if (booking.status !== "COMPLETED") {
      return res.status(400).json({ message: "Booking must be COMPLETED to review" });
    }

    // Booking must have caregiver assigned
    if (!booking.caregiverId) {
      return res.status(400).json({ message: "No caregiver assigned to this booking" });
    }

    // Prevent duplicate review for the same booking
    const alreadyReviewed = await Review.findOne({ bookingId });
    if (alreadyReviewed) {
      return res.status(409).json({ message: "Review already submitted for this booking" });
    }

    const review = await Review.create({
      bookingId,
      userId: req.user._id,
      caregiverId: booking.caregiverId,
      rating,
      comment: comment || "",
    });

    // ✅ Update caregiver rating average
    const allReviews = await Review.find({ caregiverId: booking.caregiverId });

    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / (allReviews.length || 1);

    await Caregiver.findByIdAndUpdate(booking.caregiverId, {
      ratingAvg: avg.toFixed(1),
    });

    return res.status(201).json({ message: "Review submitted ✅", review });
  } catch (error) {
    return res.status(500).json({ message: "Create review error", error: error.message });
  }
};

// ✅ Get reviews for a caregiver
const getCaregiverReviews = async (req, res) => {
  try {
    const { caregiverId } = req.params;

    const reviews = await Review.find({ caregiverId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Caregiver reviews fetched ✅", reviews });
  } catch (error) {
    return res.status(500).json({ message: "Fetch reviews error", error: error.message });
  }
};

module.exports = { createReview, getCaregiverReviews };
