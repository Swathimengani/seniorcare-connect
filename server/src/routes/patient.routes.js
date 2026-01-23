const express = require("express");
const { protect } = require("../middlewares/auth.middleware");

const {
  createPatient,
  getMyPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

const router = express.Router();

// all routes protected
router.post("/create", protect, createPatient);
router.get("/my", protect, getMyPatients);
router.put("/:patientId", protect, updatePatient);
router.delete("/:patientId", protect, deletePatient);

module.exports = router;
