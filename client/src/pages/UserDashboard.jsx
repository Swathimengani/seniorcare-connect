import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { createPatientApi, getMyPatientsApi } from "../api/patient.api";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "Male",
    medicalNeeds: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const fetchPatients = async () => {
    try {
      const res = await getMyPatientsApi();
      setPatients(res.data.patients || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createPatientApi(form);
      setForm({
        fullName: "",
        age: "",
        gender: "Male",
        medicalNeeds: "",
        allergies: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
      });
      fetchPatients();
    } catch (err) {
      alert(err?.response?.data?.message || "Error creating patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Manage patient profiles</p>
        </div>

        {/* ✅ BOOK SERVICE BUTTON (NEW) */}
        <button
          onClick={() => navigate("/user/book")}
          className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:opacity-90"
        >
          Book a Service
        </button>
        <button
            onClick={() => navigate("/user/bookings")}
            className="mt-2 md:mt-0 px-5 py-2 border rounded-lg font-medium"
            >
            My Bookings
        </button>
      </div>

      {/* ADD PATIENT */}
      <div className="bg-white border rounded-2xl p-5 mt-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Add Patient</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Medical Needs"
            value={form.medicalNeeds}
            onChange={(e) =>
              setForm({ ...form, medicalNeeds: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Allergies"
            value={form.allergies}
            onChange={(e) => setForm({ ...form, allergies: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Emergency Contact Name"
            value={form.emergencyContactName}
            onChange={(e) =>
              setForm({ ...form, emergencyContactName: e.target.value })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Emergency Contact Phone"
            value={form.emergencyContactPhone}
            onChange={(e) =>
              setForm({ ...form, emergencyContactPhone: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:opacity-90"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </form>
      </div>

      {/* PATIENT LIST */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">My Patients</h2>

        {patients.length === 0 ? (
          <p className="text-gray-600">No patients added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {patients.map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <h3 className="font-semibold">{p.fullName}</h3>
                <p className="text-sm text-gray-600">
                  Age: {p.age} | Gender: {p.gender}
                </p>
                <p className="text-sm mt-1">
                  <b>Medical:</b> {p.medicalNeeds || "—"}
                </p>
                <p className="text-sm">
                  <b>Emergency:</b> {p.emergencyContactName} (
                  {p.emergencyContactPhone})
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
