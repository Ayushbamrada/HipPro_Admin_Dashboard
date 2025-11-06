import api from "./axiosConfig";

// ✅ 1. Fetch test history of a single user
export const getUserTestHistory = async (userId) => {
  const { data } = await api.get(`/user/${userId}/test-history`);
  return data;
};

// ✅ 2. Fetch detailed full test history report
export const getTestHistoryById = async (testId) => {
  const { data } = await api.get(`/test-history/${testId}`);
  return data;
};
