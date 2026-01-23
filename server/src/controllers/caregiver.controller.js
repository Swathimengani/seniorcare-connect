const Caregiver = require("../models/Caregiver.model");

// ✅ Register Caregiver Profile (Caregiver only)
const registerCaregiver = async (req, res) => {
  try {
    const { qualification, specialization, experienceYears, serviceAreas } = req.body;

    if (!qualification || !specialization) {
      return res.status(400).json({ message: "Qualification and specialization required" });
    }

    // Prevent duplicate caregiver profile
    const existing = await Caregiver.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(409).json({ message: "Caregiver profile already exists" });
    }

    const caregiver = await Caregiver.create({
      userId: req.user._id,
      qualification,
      specialization,
      experienceYears: experienceYears || 0,
      serviceAreas: serviceAreas || [],
      verificationStatus: "PENDING",
    });

    return res.status(201).json({
      message: "Caregiver registered ✅ Waiting for admin verification",
      caregiver,
    });
  } catch (error) {
    return res.status(500).json({ message: "Caregiver register error", error: error.message });
  }
};

// ✅ Get Verified Caregivers (Public / User)
const getVerifiedCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find({ verificationStatus: "VERIFIED" })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Verified caregivers fetched ✅", caregivers });
  } catch (error) {
    return res.status(500).json({ message: "Fetch caregivers error", error: error.message });
  }
};

// ✅ Caregiver updates availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const caregiver = await Caregiver.findOne({ userId: req.user._id });
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver profile not found" });
    }

    caregiver.availability = availability || caregiver.availability;
    await caregiver.save();

    return res.status(200).json({ message: "Availability updated ✅", caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Update availability error", error: error.message });
  }
};

module.exports = {
  registerCaregiver,
  getVerifiedCaregivers,
  updateAvailability,
};
