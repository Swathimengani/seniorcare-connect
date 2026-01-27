import axiosInstance from "./axiosInstance";

export const createBookingApi = (data) =>
  axiosInstance.post("/api/bookings/create", data);

export const getMyBookingsApi = () =>
  axiosInstance.get("/api/bookings/my");
