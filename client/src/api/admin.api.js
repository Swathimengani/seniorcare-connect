import axiosInstance from "./axiosInstance";

/* BOOKINGS */
export const getAllBookingsApi = () =>
  axiosInstance.get("/api/admin/bookings");

export const assignCaregiverApi = (bookingId, caregiverId) =>
  axiosInstance.patch(`/api/admin/bookings/${bookingId}/assign`, {
    caregiverId,
  });

/* CAREGIVERS */
export const getAllCaregiversApi = () =>
  axiosInstance.get("/api/admin/caregivers/pending");

export const verifyCaregiverApi = (caregiverId) =>
  axiosInstance.patch(`/api/admin/caregivers/${caregiverId}/verify`);
