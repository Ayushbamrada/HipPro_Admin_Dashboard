import axios from "axios";

// ✅ Your actual working base URL
const api = axios.create({
  baseURL: "https://51w0w8kg-3000.inc1.devtunnels.ms/admin",
  withCredentials: false,
});

// ✅ No token needed now
api.interceptors.request.use((config) => {
  return config;
});

export default api;
