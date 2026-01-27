import axiosInstance from "./axiosInstance";

export const createPatientApi = (data) =>
  axiosInstance.post("/api/patients/create", data);

export const getMyPatientsApi = () =>
  axiosInstance.get("/api/patients/my");
