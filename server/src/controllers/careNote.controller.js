const CareNote = require("../models/CareNote.model");
const Booking = require("../models/Booking.model");
const Caregiver = require("../models/Caregiver.model");

// ✅ Caregiver adds care note
const createCareNote = async (req, res) => {
  try {
    const { bookingId, notes, vitals } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "bookingId is required" });
    }

    // Find caregiver profile
    const caregiver = await Caregiver.findOne({ userId: req.user._id });
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver profile not found" });
    }

    // Check booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Caregiver must be assigned to this booking
    if (!booking.caregiverId || booking.caregiverId.toString() !== caregiver._id.toString()) {
      return res.status(403).json({ message: "Not allowed to add note for this booking" });
    }

    const careNote = await CareNote.create({
      bookingId,
      caregiverId: caregiver._id,
      notes: notes || "",
      vitals: {
        bp: vitals?.bp || "",
        sugar: vitals?.sugar || "",
        temperature: vitals?.temperature || "",
      },
    });

    return res.status(201).json({ message: "Care note added ✅", careNote });
  } catch (error) {
    return res.status(500).json({ message: "Create care note error", error: error.message });
  }
};

// ✅ Get care notes by bookingId (User/Caregiver/Admin)
const getCareNotesByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const notes = await CareNote.find({ bookingId })
      .populate("caregiverId", "qualification specialization ratingAvg")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Care notes fetched ✅", notes });
  } catch (error) {
    return res.status(500).json({ message: "Fetch care notes error", error: error.message });
  }
};

module.exports = { createCareNote, getCareNotesByBooking };
