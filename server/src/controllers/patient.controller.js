const Patient = require("../models/Patient.model");

// ✅ Create Patient
const createPatient = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      medicalNeeds,
      allergies,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body;

    if (!fullName || !age || !gender || !emergencyContactName || !emergencyContactPhone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const patient = await Patient.create({
      userId: req.user._id,
      fullName,
      age,
      gender,
      medicalNeeds: medicalNeeds || "",
      allergies: allergies || "",
      emergencyContactName,
      emergencyContactPhone,
    });

    return res.status(201).json({ message: "Patient created ✅", patient });
  } catch (error) {
    return res.status(500).json({ message: "Create patient error", error: error.message });
  }
};

// ✅ Get My Patients
const getMyPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Patients fetched ✅", patients });
  } catch (error) {
    return res.status(500).json({ message: "Fetch patient error", error: error.message });
  }
};

// ✅ Update Patient
const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findOne({ _id: patientId, userId: req.user._id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updated = await Patient.findByIdAndUpdate(patientId, req.body, {
      new: true,
    });

    return res.status(200).json({ message: "Patient updated ✅", patient: updated });
  } catch (error) {
    return res.status(500).json({ message: "Update patient error", error: error.message });
  }
};

// ✅ Delete Patient
const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findOne({ _id: patientId, userId: req.user._id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Patient.findByIdAndDelete(patientId);

    return res.status(200).json({ message: "Patient deleted ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Delete patient error", error: error.message });
  }
};

module.exports = {
  createPatient,
  getMyPatients,
  updatePatient,
  deletePatient,
};
