const Caregiver = require("../models/Caregiver.model");
const Booking = require("../models/Booking.model");

// ✅ Get ALL caregivers (FIX)
const getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ caregivers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get only pending caregivers
const getPendingCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find({
      verificationStatus: "PENDING",
    })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Pending caregivers fetched ✅",
      caregivers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch pending caregivers error",
      error: error.message,
    });
  }
};

// ✅ Verify caregiver
const verifyCaregiver = async (req, res) => {
  try {
    const { caregiverId } = req.params;

    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    caregiver.verificationStatus = "VERIFIED";
    await caregiver.save();

    return res.status(200).json({
      message: "Caregiver VERIFIED ✅",
      caregiver,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Verify caregiver error",
      error: error.message,
    });
  }
};

// ✅ Reject caregiver
const rejectCaregiver = async (req, res) => {
  try {
    const { caregiverId } = req.params;

    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    caregiver.verificationStatus = "REJECTED";
    await caregiver.save();

    return res.status(200).json({
      message: "Caregiver REJECTED ❌",
      caregiver,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Reject caregiver error",
      error: error.message,
    });
  }
};

// ✅ Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("patientId", "fullName")
      .populate("serviceId", "name")
      .populate("caregiverId", "name");

    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ✅ Assign caregiver
const assignCaregiverToBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { caregiverId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.caregiverId = caregiverId;
    booking.status = "ASSIGNED";
    await booking.save();

    return res.status(200).json({
      message: "Caregiver assigned successfully ✅",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign caregiver",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCaregivers, // ✅ NEW
  getPendingCaregivers,
  verifyCaregiver,
  rejectCaregiver,
  getAllBookings,
  assignCaregiverToBooking,
};