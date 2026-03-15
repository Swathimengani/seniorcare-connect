import axiosInstance from "./axiosInstance";

// ✅ Create caregiver profile
export const registerCaregiverApi = (data) =>
  axiosInstance.post("/api/caregiver/register", data);

// ✅ Get my profile
export const getMyCaregiverProfile = () =>
  axiosInstance.get("/api/caregiver/me");

// ✅ Get bookings
export const getCaregiverBookingsApi = () =>
  axiosInstance.get("/api/bookings/caregiver");

// ✅ Update booking status
export const updateBookingStatusApi = (bookingId, status) =>
  axiosInstance.patch(`/api/bookings/${bookingId}/status`, { status });