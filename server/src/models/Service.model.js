const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String, default: "" },

    durationType: {
      type: String,
      enum: ["HOURLY", "DAILY", "LONG_TERM"],
      required: true,
    },

    basePrice: { type: Number, required: true },

    requiredQualification: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
