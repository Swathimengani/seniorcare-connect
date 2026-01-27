import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMyBookingsApi } from "../api/booking.api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookingsApi();
      setBookings(res.data.bookings || []);
    } catch{
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-600 mb-6">
        Track your service requests and status
      </p>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
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

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    b.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "ACCEPTED"
                      ? "bg-blue-100 text-blue-700"
                      : b.status === "IN_PROGRESS"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Patient: <b>{b.patientId?.fullName}</b>
              </p>

              <p className="text-sm text-gray-600">
                Date: {b.scheduleDate} | Time: {b.scheduleTime}
              </p>

              <p className="text-sm text-gray-600">
                Duration: {b.durationPlan}
              </p>

              {b.caregiverId && (
                <p className="text-sm mt-1">
                  Caregiver Assigned ✔
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
