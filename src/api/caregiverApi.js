import api from "./axiosConfig";

export const getAllCaregivers = async () => {
  const { data } = await api.get("/caregivers");

  let caregivers = data;

  if (Array.isArray(data) && Array.isArray(data[0])) {
    caregivers = data[0];
  }

  return caregivers;
};

export const getCaregiversOfUser = async (userId) => {
  const { data } = await api.get(`/user/${userId}/caregivers`);

  let list = data;

  if (Array.isArray(list) && Array.isArray(list[0])) {
    list = list[0];
  }

  return list;
};
