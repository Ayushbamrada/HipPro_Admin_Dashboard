
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";  // 👈 import
// import { Menu, Users, HeartHandshake, Bell, ListChecks, Dumbbell, Settings, Home } from "lucide-react";

// export default function Sidebar() {
//   const [open, setOpen] = useState(true);
//   const { logout } = useContext(AuthContext);  // 👈 use logout
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // clears token
//     navigate("/login", { replace: true }); // go to login page
//   };


//   return (
//     <div
//       className={`${open ? "w-64" : "w-20"} 
//       fixed left-0 top-0 h-screen 
//       bg-gradient-to-b from-gray-900 to-gray-800 
//       text-white flex flex-col 
//       transition-all duration-300 shadow-xl z-50`}
//     >
//       {/* Toggle */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="p-3 hover:bg-gray-700 transition mb-4"
//       >
//         <Menu size={22} />
//       </button>

//       <h1
//         className={`text-2xl font-bold mb-6 transition-opacity duration-300 ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         HIP PRO
//       </h1>

//       <nav className="flex flex-col gap-3">
//         <SidebarLink to="/" icon={<Home />} open={open} label="Dashboard" />
//         <SidebarLink to="/users" icon={<Users />} open={open} label="Users" />
//         <SidebarLink to="/caregivers" icon={<HeartHandshake />} open={open} label="Caregivers" />
//         <SidebarLink to="/sos" icon={<Bell />} open={open} label="SOS Logs" />
//         <SidebarLink to="/tests" icon={<ListChecks />} open={open} label="Test History" />
//         <SidebarLink to="/exercises" icon={<Dumbbell />} open={open} label="Exercises" />
//         <SidebarLink to="/settings" icon={<Settings />} open={open} label="Settings" />
//       </nav>
//        {/* 👇 Add logout at bottom */}
//       <button
//         onClick={handleLogout}
//         className="absolute bottom-5 left-0 w-full text-center py-3 bg-red-600 hover:bg-red-700"
//       >
//         {open ? "Logout" : "⏻"}
//       </button>
//     </div>
//   );
// }

// function SidebarLink({ to, icon, label, open }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-4 px-4 py-3 rounded-md transition 
//         ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"}`
//       }
//     >
//       {icon}
//       <span className={`${open ? "block" : "hidden"}`}>{label}</span>
//     </NavLink>
//   );
// }




// src/components/layout/Sidebar.jsx
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  Users,
  HeartHandshake,
  Bell,
  ListChecks,
  Dumbbell,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + localStorage
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`${open ? "w-64" : "w-20"} 
      fixed left-0 top-0 h-screen 
      bg-gradient-to-b from-gray-900 to-gray-800 
      text-white flex flex-col 
      transition-all duration-300 shadow-xl z-50`}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 hover:bg-gray-700 transition mb-4"
      >
        <Menu size={22} />
      </button>

      <h1
        className={`text-2xl font-bold mb-6 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        HIP PRO
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-1">
        <SidebarLink to="/" icon={<Home />} open={open} label="Dashboard" />
        <SidebarLink to="/users" icon={<Users />} open={open} label="Users" />
        <SidebarLink
          to="/caregivers"
          icon={<HeartHandshake />}
          open={open}
          label="Caregivers"
        />
        <SidebarLink to="/sos" icon={<Bell />} open={open} label="SOS Logs" />
        <SidebarLink
          to="/tests"
          icon={<ListChecks />}
          open={open}
          label="Test History"
        />
        <SidebarLink
          to="/exercises"
          icon={<Dumbbell />}
          open={open}
          label="Exercises"
        />
        <SidebarLink
          to="/settings"
          icon={<Settings />}
          open={open}
          label="Settings"
        />
      </nav>

      {/* Logout button at bottom */}
      <button
        onClick={handleLogout}
        className="m-3 mb-5 flex items-center justify-center gap-2 
        bg-red-600 hover:bg-red-700 py-2 rounded-md text-sm font-medium"
      >
        <LogOut size={18} />
        {open && <span>Logout</span>}
      </button>
    </div>
  );
}

function SidebarLink({ to, icon, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-md transition 
        ${
          isActive
            ? "bg-gray-700 text-white"
            : "hover:bg-gray-800 text-gray-200"
        }`
      }
    >
      {icon}
      <span className={`${open ? "block" : "hidden"}`}>{label}</span>
    </NavLink>
  );
}
