const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const serviceRoutes = require("./routes/service.routes");
const caregiverRoutes = require("./routes/caregiver.routes");
const adminRoutes = require("./routes/admin.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");
const careNoteRoutes = require("./routes/careNote.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SeniorCare Connect Backend Running ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/care-notes", careNoteRoutes);


module.exports = app;
