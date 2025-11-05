import api from "./axiosConfig";

export const adminLogin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};
