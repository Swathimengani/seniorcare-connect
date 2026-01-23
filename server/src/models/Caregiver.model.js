const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    qualification: { type: String, required: true },

    specialization: {
      type: String,
      enum: ["Nursing", "Physiotherapy", "Attendant", "PostHospitalCare"],
      required: true,
    },

    experienceYears: { type: Number, default: 0 },

    verificationStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },

    documents: {
      idProofUrl: { type: String, default: "" },
      certificateUrl: { type: String, default: "" },
    },

    serviceAreas: [{ type: String }],

    availability: [
      {
        day: { type: String }, // Mon, Tue...
        slots: [{ type: String }], // "10:00-12:00"
      },
    ],

    ratingAvg: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Caregiver", caregiverSchema);
