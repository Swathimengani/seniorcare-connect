const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    fullName: { type: String, required: true, trim: true },

    age: { type: Number, required: true },

    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },

    medicalNeeds: { type: String, default: "" },

    allergies: { type: String, default: "" },

    emergencyContactName: { type: String, required: true },

    emergencyContactPhone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
