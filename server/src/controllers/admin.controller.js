const Caregiver = require("../models/Caregiver.model");

// ✅ Get all pending caregivers
const getPendingCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find({ verificationStatus: "PENDING" })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Pending caregivers fetched ✅", caregivers });
  } catch (error) {
    return res.status(500).json({ message: "Fetch pending caregivers error", error: error.message });
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

    return res.status(200).json({ message: "Caregiver VERIFIED ✅", caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Verify caregiver error", error: error.message });
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

    return res.status(200).json({ message: "Caregiver REJECTED ❌", caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Reject caregiver error", error: error.message });
  }
};

module.exports = {
  getPendingCaregivers,
  verifyCaregiver,
  rejectCaregiver,
};
