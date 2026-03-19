import api from "./api";

export const getPermissions = async () => {
  const response = await api.get("/permissions");
  return response.data;
};

export const getPermission = async (id: number) => {
  const response = await api.get(`/permissions/${id}`);
  return response.data;
};

export const createPermission = async (permission_name: string) => {
  const response = await api.post("/permissions", { permission_name });
  return response.data;
};

export const updatePermission = async (id: number, permission_name: string) => {
  const response = await api.put(`/permissions/${id}`, { permission_name });
  return response.data;
};

export const deletePermission = async (id: number) => {
  const response = await api.delete(`/permissions/${id}`);
  return response.data;
};
