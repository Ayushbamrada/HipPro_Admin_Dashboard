import api from "./axiosConfig";

// Get all exercises
export const getAllExercises = async () => {
  const { data } = await api.get("/exercise");
  return data;
};

// Assign exercises to a user
export const assignExercisesToUser = async (payload) => {
  const { data } = await api.post("/user-exercise", payload);
  return data;
};

// Fetch user's assigned exercises
export const getUserAssignedExercises = async (userId) => {
  const { data } = await api.get(`/user-exercise/${userId}`);
  return data;
};
