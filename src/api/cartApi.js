// src/api/cartApi.js
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/cart" });

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addToCart = (itemId, quantity) =>
  API.post("/add", { itemId, quantity });

export const removeFromCart = (itemId) => API.delete(`/remove/${itemId}`);

export const getCart = () => API.get("/");
