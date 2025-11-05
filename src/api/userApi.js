import api from "./axiosConfig";

export const getAllUsers = async () => {
  const { data } = await api.get("/users");

  let users = data;

  // ✅ If response is double nested array: [ [ {...}, {...} ] ]
  if (Array.isArray(data) && Array.isArray(data[0])) {
    users = data[0];
  }

  return users;  // ✅ Always return flat users list
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`);

  // backend returns user under "user" key
  return data.user || data;
};
