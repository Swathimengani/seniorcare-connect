import axiosInstance from "./axiosInstance";

export const getCaregiverBookingsApi = () =>
  axiosInstance.get("/api/bookings/caregiver");

export const updateBookingStatusApi = (bookingId, status) =>
  axiosInstance.patch(`/api/bookings/${bookingId}/status`, { status });
