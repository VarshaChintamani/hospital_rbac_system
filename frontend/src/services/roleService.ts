import api from "./api";

export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const getRole = async (id: number) => {
  const response = await api.get(`/roles/${id}`);
  return response.data;
};

export const createRole = async (role_name: string) => {
  const response = await api.post("/roles", { role_name });
  return response.data;
};

export const updateRole = async (id: number, role_name: string) => {
  const response = await api.put(`/roles/${id}`, { role_name });
  return response.data;
};

export const deleteRole = async (id: number) => {
  const response = await api.delete(`/roles/${id}`);
  return response.data;
};
