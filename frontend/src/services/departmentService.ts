import api from "./api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

export const getDepartment = async (id: number) => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
};

export const createDepartment = async (department_name: string) => {
  const response = await api.post("/departments", { department_name });
  return response.data;
};

export const updateDepartment = async (id: number, department_name: string) => {
  const response = await api.put(`/departments/${id}`, { department_name });
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};
