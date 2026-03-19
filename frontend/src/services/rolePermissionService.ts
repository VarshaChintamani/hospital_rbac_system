import api from "./api";

export const getRolePermissions = async () => {
  const response = await api.get("/role-permissions");
  return response.data;
};

export const getRolePermission = async (id: number) => {
  const response = await api.get(`/role-permissions/${id}`);
  return response.data;
};

export const createRolePermission = async (role_id: number, permission_id: number) => {
  const response = await api.post("/role-permissions", { role_id, permission_id });
  return response.data;
};

export const updateRolePermission = async (id: number, role_id: number, permission_id: number) => {
  const response = await api.put(`/role-permissions/${id}`, { role_id, permission_id });
  return response.data;
};

export const deleteRolePermission = async (id: number) => {
  const response = await api.delete(`/role-permissions/${id}`);
  return response.data;
};
