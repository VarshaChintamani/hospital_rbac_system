import api from "./api";

export const getEmergencyAccess = async () => {
  const response = await api.get("/emergency");
  return response.data;
};

export const getEmergencyAccessById = async (id: number) => {
  const response = await api.get(`/emergency/${id}`);
  return response.data;
};

export const requestEmergencyAccess = async (data: { patient_id: number; reason: string }) => {
  const response = await api.post("/emergency", data);
  return response.data;
};

export const updateEmergencyAccess = async (id: number, data: { user_id: number; patient_id: number; reason: string; status: string }) => {
  const response = await api.put(`/emergency/${id}`, data);
  return response.data;
};

export const deleteEmergencyAccess = async (id: number) => {
  const response = await api.delete(`/emergency/${id}`);
  return response.data;
};
