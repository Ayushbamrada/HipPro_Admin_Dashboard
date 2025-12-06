// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backened.dashboard.ripplehealthcare.in",
  withCredentials: true, // keep for cookies or cross-site credentials
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response handler: on 401/403 remove token & redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("adminToken");
      // safe redirect
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
