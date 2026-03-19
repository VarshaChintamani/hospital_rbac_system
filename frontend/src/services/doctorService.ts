import api from "./api";

export const getDoctors = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getDoctor = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateDoctor = async (id: number, data: { name: string; email: string; role_id: number }) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteDoctor = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
