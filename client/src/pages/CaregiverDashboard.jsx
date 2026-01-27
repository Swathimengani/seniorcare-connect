import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getCaregiverBookingsApi,
  updateBookingStatusApi,
} from "../api/caregiver.api";

export default function CaregiverDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getCaregiverBookingsApi();
      setBookings(res.data.bookings || []);
    } catch {
      alert("Failed to load bookings");
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
      <p className="text-gray-600 mb-6">
        Manage assigned service requests
      </p>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {b.serviceId?.name}
                </h3>

                <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                  {b.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Patient: {b.patientId?.fullName}
              </p>

              <p className="text-sm text-gray-600">
                Date: {b.scheduleDate} | {b.scheduleTime}
              </p>

              <p className="text-sm text-gray-600">
                Address: {b.address}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {b.status === "PENDING" && (
                  <button
                    disabled={loading}
                    onClick={() => updateStatus(b._id, "ACCEPTED")}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Accept
                  </button>
                )}

                {b.status === "ACCEPTED" && (
                  <button
                    disabled={loading}
                    onClick={() => updateStatus(b._id, "IN_PROGRESS")}
                    className="px-3 py-1 bg-purple-600 text-white rounded"
                  >
                    Start
                  </button>
                )}

                {b.status === "IN_PROGRESS" && (
                  <button
                    disabled={loading}
                    onClick={() => updateStatus(b._id, "COMPLETED")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
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
