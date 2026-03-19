import api from "./api";

export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const getAppointment = async (id: number) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

export const createAppointment = async (data: { patient_id: number; doctor_id: number; appointment_date: string }) => {
  const response = await api.post("/appointments", data);
  return response.data;
};

export const updateAppointment = async (id: number, data: { patient_id: number; doctor_id: number; appointment_date: string; status: string }) => {
  const response = await api.put(`/appointments/${id}`, data);
  return response.data;
};

export const deleteAppointment = async (id: number) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};
