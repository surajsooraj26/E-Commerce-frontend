// src/api/itemApi.js
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/items" });

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getItems = (filters) => API.get("/", { params: filters });
export const createItem = (data) => API.post("/", data);
export const updateItem = (id, data) => API.put(`/${id}`, data);
export const deleteItem = (id) => API.delete(`/${id}`);
