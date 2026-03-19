import api from "./api";

export const getMedicalRecords = async () => {
  const response = await api.get("/medical-records");
  return response.data;
};

export const getMedicalRecord = async (id: number) => {
  const response = await api.get(`/medical-records/${id}`);
  return response.data;
};

export const createMedicalRecord = async (data: { patient_id: number; doctor_id: number; diagnosis: string; prescription: string; notes: string }) => {
  const response = await api.post("/medical-records", data);
  return response.data;
};

export const updateMedicalRecord = async (id: number, data: { patient_id: number; doctor_id: number; diagnosis: string; prescription: string; notes: string }) => {
  const response = await api.put(`/medical-records/${id}`, data);
  return response.data;
};

export const deleteMedicalRecord = async (id: number) => {
  const response = await api.delete(`/medical-records/${id}`);
  return response.data;
};
