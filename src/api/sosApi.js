// import api from "./axiosConfig";

// // ✅ Fetch SOS logs for a specific user
// export const getUserSOSHistory = async (userId) => {
//   const { data } = await api.get(`/user/${userId}/sos-history`);

//   let logs = data;

//   // Handle double-nested backend format: [ [ {...}, {...} ] ]
//   if (Array.isArray(data) && Array.isArray(data[0])) {
//     logs = data[0];
//   }

//   return logs;
// };

// // ✅ Fetch ALL SOS logs (global logs page)
// export const getAllSOSLogs = async () => {
//   const { data } = await api.get("/sos-logs");

//   let logs = data;

//   if (Array.isArray(data) && Array.isArray(data[0])) {
//     logs = data[0];
//   }

//   return logs;
// };
import api from "./axiosConfig";

// ✅ Global SOS history (sidebar -> SOS Logs)
export const getAllSOSHistory = async () => {
  const { data } = await api.get("/sos-history");
  console.log("getAllSOSHistory data:", data);
  return Array.isArray(data) ? data : [];
};

// ✅ User-specific SOS logs (UserDetails page)
export const getUserSOSHistory = async (userId) => {
  const { data } = await api.get(`/user/${userId}/sos-history`);
  return Array.isArray(data) ? data : [];
};


