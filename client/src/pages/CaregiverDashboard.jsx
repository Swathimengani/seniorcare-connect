import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../api/axiosInstance";
import {
  getCaregiverBookingsApi,
  updateBookingStatusApi,
} from "../api/caregiver.api";

export default function CaregiverDashboard() {
  const [bookings, setBookings] = useState([]);
  const [setLoading] = useState(false);

  const [profileExists, setProfileExists] = useState(false);
  const [form, setForm] = useState({
    qualification: "",
    specialization: "Nursing",
    experienceYears: 0,
  });

  const checkProfile = async () => {
    try {
      await axiosInstance.get("/api/caregiver/me");
      setProfileExists(true);
    } catch {
      setProfileExists(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await getCaregiverBookingsApi();
      setBookings(res.data.bookings || []);
    } catch {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    checkProfile();
    fetchBookings();
  }, []);

  const createProfile = async () => {
    try {
      await axiosInstance.post("/api/caregiver/register", form);
      alert("Profile created ✅");
      setProfileExists(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await updateBookingStatusApi(id, status);
      fetchBookings();
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">Caregiver Dashboard</h1>

      {/* PROFILE FORM */}
      {!profileExists && (
        <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">Complete Your Profile</h2>

          <input
            placeholder="Qualification"
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, qualification: e.target.value })
            }
          />

          <select
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
          >
            <option>Nursing</option>
            <option>Physiotherapy</option>
            <option>Attendant</option>
            <option>PostHospitalCare</option>
          </select>

          <input
            type="number"
            placeholder="Experience"
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({
                ...form,
                experienceYears: e.target.value,
              })
            }
          />

          <button
            onClick={createProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Profile
          </button>
        </div>
      )}

      {/* BOOKINGS */}
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white border rounded-xl p-4">
              <h3>{b.serviceId?.name}</h3>
              <p>Status: {b.status}</p>

              <div className="flex gap-2 mt-3">
                {b.status === "PENDING" && (
                  <button onClick={() => updateStatus(b._id, "ACCEPTED")}>
                    Accept
                  </button>
                )}
                {b.status === "ACCEPTED" && (
                  <button onClick={() => updateStatus(b._id, "IN_PROGRESS")}>
                    Start
                  </button>
                )}
                {b.status === "IN_PROGRESS" && (
                  <button onClick={() => updateStatus(b._id, "COMPLETED")}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}