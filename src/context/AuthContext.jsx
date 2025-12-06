// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [token, setToken] = useState(localStorage.getItem("adminToken"));

//   const login = (jwt) => {
//     localStorage.setItem("adminToken", jwt);
//     setToken(jwt);
//   };

//   const logout = () => {
//     localStorage.removeItem("adminToken");
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// src/context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  const login = (jwt) => {
    localStorage.setItem("adminToken", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
