import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/Users/UsersList";
import UserDetails from "./pages/Users/UserDetails";
import ExerciseList from "./pages/Exercises/ExerciseList";
import SOSLogs from "./pages/SOS/SOSLogs";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Sidebar is fixed and never moves */}
      <Sidebar />

      {/* ✅ Main content adjusts next to fixed sidebar */}
      <div className="ml-64 h-screen overflow-y-auto p-6 bg-gray-50">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/sos" element={<SOSLogs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
