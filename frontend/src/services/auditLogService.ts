import api from "./api";

export const getAuditLogs = async () => {
  const response = await api.get("/audit-logs");
  return response.data;
};

export const getAuditLog = async (id: number) => {
  const response = await api.get(`/audit-logs/${id}`);
  return response.data;
};

export const createAuditLog = async (data: { user_id: number; action: string; patient_id?: number | null }) => {
  const response = await api.post("/audit-logs", data);
  return response.data;
};

export const updateAuditLog = async (id: number, data: { user_id: number; action: string; patient_id?: number | null }) => {
  const response = await api.put(`/audit-logs/${id}`, data);
  return response.data;
};

export const deleteAuditLog = async (id: number) => {
  const response = await api.delete(`/audit-logs/${id}`);
  return response.data;
};
