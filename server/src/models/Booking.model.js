const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Caregiver", default: null },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    scheduleDate: { type: String, required: true }, // "2026-01-23"
    scheduleTime: { type: String, required: true }, // "10:30 AM"

    durationPlan: { type: String, required: true }, // "2 Hours", "7 Days", etc.

    address: { type: String, required: true },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
