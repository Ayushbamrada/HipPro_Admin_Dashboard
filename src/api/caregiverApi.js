import api from "./axiosConfig";

export const getAllCaregivers = async () => {
  const { data } = await api.get("/caregivers");
  return data;
};
