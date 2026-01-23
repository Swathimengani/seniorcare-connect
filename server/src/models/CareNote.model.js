const mongoose = require("mongoose");

const careNoteSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Caregiver", required: true },

    notes: { type: String, default: "" },

    vitals: {
      bp: { type: String, default: "" },
      sugar: { type: String, default: "" },
      temperature: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareNote", careNoteSchema);
