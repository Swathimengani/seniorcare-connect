import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getAllBookingsApi,
  assignCaregiverApi,
  getAllCaregiversApi,
  verifyCaregiverApi,
} from "../api/admin.api";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const b = await getAllBookingsApi();
    const c = await getAllCaregiversApi();
    setBookings(b.data.bookings || []);
    setCaregivers(c.data.caregivers || []);
  };

  const assignCaregiver = async (bookingId, caregiverId) => {
    await assignCaregiverApi(bookingId, caregiverId);
    fetchData();
  };

  const verifyCaregiver = async (id) => {
    await verifyCaregiverApi(id);
    fetchData();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* BOOKINGS */}
      <h2 className="text-lg font-semibold mb-3">All Bookings</h2>

      <div className="space-y-4 mb-10">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold">{b.serviceId?.name}</h3>
            <p className="text-sm text-gray-600">
              Patient: {b.patientId?.fullName}
            </p>
            <p className="text-sm text-gray-600">
              Status: <b>{b.status}</b>
            </p>

            {/* ASSIGN CAREGIVER */}
            {!b.caregiverId && (
              <select
                className="border p-2 rounded mt-2"
                onChange={(e) =>
                  assignCaregiver(b._id, e.target.value)
                }
              >
                <option value="">Assign Caregiver</option>
                {caregivers
                  .filter((c) => c.isVerified)
                  .map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            )}

            {b.caregiverId && (
              <p className="text-sm mt-2 text-green-600">
                Caregiver Assigned ✔
              </p>
            )}
          </div>
        ))}
      </div>

      {/* CAREGIVER VERIFICATION */}
      <h2 className="text-lg font-semibold mb-3">Caregivers</h2>

      <div className="space-y-3">
        {caregivers.map((c) => (
          <div
            key={c._id}
            className="bg-white border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
            </div>

            {!c.isVerified ? (
              <button
                onClick={() => verifyCaregiver(c._id)}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Verify
              </button>
            ) : (
              <span className="text-green-600 font-medium">Verified</span>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
