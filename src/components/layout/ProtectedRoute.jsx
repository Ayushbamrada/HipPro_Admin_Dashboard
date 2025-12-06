import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

export default function ProtectedRoute() {
  const { token } = useContext(AuthContext);
  console.log("ProtectedRoute token:", token);

  // If not logged in → go to login page
  if (!token) return <Navigate to="/login" replace />;

  // If logged in → show Sidebar + main content (Outlet)
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 h-screen p-6 w-full overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
