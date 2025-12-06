import api from "./axiosConfig";


// ✅ Fetch all test history (for dashboard)
export const getAllTestHistory = async () => {
  const { data } = await api.get("/test-history/all");
  return data;
};

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
