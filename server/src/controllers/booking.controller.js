const Booking = require("../models/Booking.model");
const Caregiver = require("../models/Caregiver.model");

// ✅ User creates booking request
const createBooking = async (req, res) => {
  try {
    const {
      patientId,
      serviceId,
      scheduleDate,
      scheduleTime,
      durationPlan,
      address,
      caregiverId,
    } = req.body;

    if (!patientId || !serviceId || !scheduleDate || !scheduleTime || !durationPlan || !address) {
      return res.status(400).json({ message: "All booking fields are required" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      patientId,
      serviceId,
      scheduleDate,
      scheduleTime,
      durationPlan,
      address,
      caregiverId: caregiverId || null,
      status: "PENDING",
    });

    return res.status(201).json({ message: "Booking created ✅", booking });
  } catch (error) {
    return res.status(500).json({ message: "Create booking error", error: error.message });
  }
};

// ✅ User booking history
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("patientId", "fullName age gender")
      .populate("serviceId", "name durationType basePrice")
      .populate("caregiverId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "My bookings fetched ✅", bookings });
  } catch (error) {
    return res.status(500).json({ message: "Fetch bookings error", error: error.message });
  }
};

// ✅ Caregiver: view bookings assigned to them OR unassigned
const getCaregiverBookings = async (req, res) => {
  try {
    const caregiver = await Caregiver.findOne({ userId: req.user._id });

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver profile not found" });
    }

    if (caregiver.verificationStatus !== "VERIFIED") {
      return res.status(403).json({ message: "Caregiver not verified yet" });
    }

    const bookings = await Booking.find({
      $or: [
        { caregiverId: caregiver._id },
        { caregiverId: null }, // unassigned bookings
      ],
      status: "PENDING",
    })
      .populate("patientId", "fullName age gender medicalNeeds")
      .populate("serviceId", "name durationType basePrice")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Caregiver bookings fetched ✅", bookings });
  } catch (error) {
    return res.status(500).json({ message: "Fetch caregiver bookings error", error: error.message });
  }
};

// ✅ Caregiver accepts booking
const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const caregiver = await Caregiver.findOne({ userId: req.user._id });
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver profile not found" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "PENDING") {
      return res.status(400).json({ message: "Booking is not pending" });
    }

    booking.caregiverId = caregiver._id;
    booking.status = "ACCEPTED";
    await booking.save();

    return res.status(200).json({ message: "Booking ACCEPTED ✅", booking });
  } catch (error) {
    return res.status(500).json({ message: "Accept booking error", error: error.message });
  }
};

// ✅ Caregiver rejects booking
const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "REJECTED";
    await booking.save();

    return res.status(200).json({ message: "Booking REJECTED ❌", booking });
  } catch (error) {
    return res.status(500).json({ message: "Reject booking error", error: error.message });
  }
};

// ✅ Caregiver updates status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const valid = ["ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({ message: "Booking status updated ✅", booking });
  } catch (error) {
    return res.status(500).json({ message: "Update booking status error", error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getCaregiverBookings,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
};
