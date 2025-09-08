// src/api/authApi.js
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/auth" });

// Attach token if available (useful for protected routes later)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);
