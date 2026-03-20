import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://hospitalrbacsystem-production.up.railway.app/api";

const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;