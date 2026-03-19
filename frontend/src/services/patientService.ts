import api from "./api";

export const getPatients = async () => {

  const res = await api.get("/patients");

  return res.data;

};

export const getPatient = async (id: number) => {
  const res = await api.get(`/patients/${id}`);
  return res.data;
};

export const createPatient = async (data: any) => {

  const res = await api.post("/patients", data);

  return res.data;

};

export const updatePatient = async (id: number, data: any) => {
  const res = await api.put(`/patients/${id}`, data);
  return res.data;
};

export const deletePatient = async (id: number) => {
  const res = await api.delete(`/patients/${id}`);
  return res.data;
};