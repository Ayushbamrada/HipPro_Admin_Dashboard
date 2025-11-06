// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Menu,
//   Home,
//   Users,
//   HeartHandshake,
//   Bell,
//   ClipboardList,
//   Dumbbell,
//   Settings,
// } from "lucide-react";

// export default function Sidebar() {
//   const [open, setOpen] = useState(true);

//   const menuItems = [
//     { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
//     { path: "/users", label: "Users", icon: <Users size={20} /> },
//     { path: "/caregivers", label: "Caregivers", icon: <HeartHandshake size={20} /> },
//     { path: "/sos", label: "SOS Logs", icon: <Bell size={20} /> },
//     { path: "/tests", label: "Test History", icon: <ClipboardList size={20} /> },
//     { path: "/exercises", label: "Exercises", icon: <Dumbbell size={20} /> },
//     { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
//   ];

//   return (
//     <div
//       className={`
//         fixed left-0 top-0 h-screen
//         ${open ? "w-64" : "w-20"}
//         transition-all duration-300
//         bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
//         text-white shadow-xl border-r border-gray-700
//         overflow-hidden
//       `}
//     >
//       {/* Toggle Button */}
//       <div className="p-4">
//         <button
//           onClick={() => setOpen(!open)}
//           className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
//         >
//           <Menu size={22} />
//         </button>
//       </div>

//       {/* Title */}
//       <h1
//         className={`text-2xl font-bold px-4 mb-4 transition-all duration-300 ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         HIP PRO
//       </h1>

//       {/* Menu Items */}
//       <nav className="flex flex-col gap-2 px-2 mt-3">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `
//               flex items-center gap-3 px-4 py-3 rounded-lg
//               transition-all duration-200
//               ${isActive ? "bg-white/20" : "hover:bg-white/10"}
//               `
//             }
//           >
//             {item.icon}

//             <span
//               className={`text-sm font-medium transition-opacity duration-300 ${
//                 open ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {item.label}
//             </span>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// }
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Users, HeartHandshake, Bell, ListChecks, Dumbbell, Settings, Home } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

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

      <nav className="flex flex-col gap-3">
        <SidebarLink to="/" icon={<Home />} open={open} label="Dashboard" />
        <SidebarLink to="/users" icon={<Users />} open={open} label="Users" />
        <SidebarLink to="/caregivers" icon={<HeartHandshake />} open={open} label="Caregivers" />
        <SidebarLink to="/sos" icon={<Bell />} open={open} label="SOS Logs" />
        <SidebarLink to="/tests" icon={<ListChecks />} open={open} label="Test History" />
        <SidebarLink to="/exercises" icon={<Dumbbell />} open={open} label="Exercises" />
        <SidebarLink to="/settings" icon={<Settings />} open={open} label="Settings" />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-md transition 
        ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"}`
      }
    >
      {icon}
      <span className={`${open ? "block" : "hidden"}`}>{label}</span>
    </NavLink>
  );
}
