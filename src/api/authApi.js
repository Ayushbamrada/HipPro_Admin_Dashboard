// // src/api/authApi.js
// import api from "./api";

// /**
//  * adminLogin(email, password)
//  * returns the backend response (e.g. { token, admin })
//  */
// export const adminLogin = async (email, password) => {
//   const res = await api.post("/admin/login", { email, password });
//   // adapt depending on backend response structure:
//   // assume res.data = { token: "...", admin: {...} }
//   if (res?.data?.token) {
//     localStorage.setItem("adminToken", res.data.token);
//   }
//   return res.data;
// };

// /**
//  * adminLogout() - local logout
//  * Optionally call backend logout if your backend maintains sessions/cookies.
//  */
// export const adminLogout = async () => {
//   try {
//     // If backend exposes logout endpoint (optional):
//     // await api.post("/admin/logout");
//   } catch (e) {
//     // ignore network error on logout
//   } finally {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/login";
//   }
// };

// /**
//  * verifyAdmin() - call a protected endpoint to check token validity
//  */
// export const verifyAdmin = async () => {
//   const res = await api.get("/admin/verify"); // adapt endpoint
//   return res.data;
// };


// src/api/authApi.js
import api from "./api";

/**
 * adminLogin({ email, password })
 * returns the backend response (e.g. { token, admin })
 */
export const adminLogin = async ({ email, password }) => {
  const res = await api.post("/admin/login", { email, password });

  // assume res.data = { token: "...", admin: {...} }
  if (res?.data?.token) {
    localStorage.setItem("adminToken", res.data.token);
  }

  return res.data;
};

export const adminLogout = async () => {
  try {
    // If backend has logout endpoint:
    // await api.post("/admin/logout");
  } catch (e) {
    // ignore network errors here
  } finally {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }
};

export const verifyAdmin = async () => {
  const res = await api.get("/admin/verify"); // adjust to your backend
  return res.data;
};
