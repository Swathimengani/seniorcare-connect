import axiosInstance from "./axiosInstance";

export const getServicesApi = () =>
  axiosInstance.get("/api/services");
