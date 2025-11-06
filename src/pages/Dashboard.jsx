// import { useEffect, useState } from "react";
// import { getAllUsers } from "../api/userApi";
// import { getAllSOSHistory } from "../api/sosApi";
// import { Users, Bell, AlertTriangle } from "lucide-react";

// export default function Dashboard() {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalSOS, setTotalSOS] = useState(0);
//   const [todaySOS, setTodaySOS] = useState([]);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       // ✅ Fetch all users
//       const users = await getAllUsers();

//       // ✅ Fetch all SOS logs
//       const sosLogs = await getAllSOSHistory();

//       console.log("Users from Dashboard:", users);
//       console.log("SOS from Dashboard:", sosLogs);

//       // ✅ Set total counts
//       setTotalUsers(users.length);
//       setTotalSOS(sosLogs.length);

//       // ✅ Filter today's SOS logs
//       const today = new Date().toDateString();
//       const todaysLogs = sosLogs.filter(
//         (log) => new Date(log.time).toDateString() === today
//       );

//       setTodaySOS(todaysLogs);
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-2">HIP PRO Dashboard</h1>
//       <p className="text-gray-600 mb-6">
//         Overview of users, alerts, and device activity.
//       </p>

//       {/* ✅ Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
//           <Users size={40} className="text-blue-600" />
//           <div>
//             <p className="text-2xl font-bold">{totalUsers}</p>
//             <p className="text-gray-500">Total Users</p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
//           <Bell size={40} className="text-red-500" />
//           <div>
//             <p className="text-2xl font-bold">{totalSOS}</p>
//             <p className="text-gray-500">Total SOS Alerts</p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
//           <AlertTriangle size={40} className="text-yellow-500" />
//           <div>
//             <p className="text-2xl font-bold">{todaySOS.length}</p>
//             <p className="text-gray-500">Today's SOS Alerts</p>
//           </div>
//         </div>

//       </div>

//       {/* ✅ Recent SOS Logs */}
//       <div className="bg-white p-5 rounded-xl shadow mt-8">
//         <h2 className="text-xl font-medium mb-4">Today's SOS Alerts</h2>

//         {todaySOS.length === 0 ? (
//           <p className="text-gray-500 text-sm">No SOS alerts today.</p>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">User</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-left">Time</th>
//               </tr>
//             </thead>

//             <tbody>
//               {todaySOS.map((log) => (
//                 <tr key={log._id} className="border-b">
//                   <td className="p-3">{log.userId.fullName}</td>
//                   <td className="p-3">{log.userId.phoneNo}</td>
//                   <td className="p-3">
//                     {new Date(log.time).toLocaleTimeString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import { getAllSOSHistory } from "../api/sosApi";
import { Users, Bell, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSOS, setTotalSOS] = useState(0);
  const [todaySOS, setTodaySOS] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true); // ✅ Start loading

      const users = await getAllUsers();
      const sosLogs = await getAllSOSHistory();

      console.log("Users from Dashboard:", users);
      console.log("SOS from Dashboard:", sosLogs);

      setTotalUsers(users.length);
      setTotalSOS(sosLogs.length);

      // ✅ filter today's logs
      const today = new Date().toDateString();
      const todaysLogs = sosLogs.filter(
        (log) => new Date(log.time).toDateString() === today
      );

      setTodaySOS(todaysLogs);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false); // ✅ Finish loading
    }
  };

  // ✅ SHOW SPINNER WHILE LOADING
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">HIP PRO Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Overview of users, alerts, and device activity.
      </p>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <Users size={40} className="text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <Bell size={40} className="text-red-500" />
          <div>
            <p className="text-2xl font-bold">{totalSOS}</p>
            <p className="text-gray-500">Total SOS Alerts</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <AlertTriangle size={40} className="text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">{todaySOS.length}</p>
            <p className="text-gray-500">Today's SOS Alerts</p>
          </div>
        </div>

      </div>

      {/* ✅ Recent SOS Logs */}
      <div className="bg-white p-5 rounded-xl shadow mt-8">
        <h2 className="text-xl font-medium mb-4">Today's SOS Alerts</h2>

        {todaySOS.length === 0 ? (
          <p className="text-gray-500 text-sm">No SOS alerts today.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {todaySOS.map((log) => (
                <tr key={log._id} className="border-b">
                  <td className="p-3">{log?.userId?.fullName}</td>
                  <td className="p-3">{log?.userId?.phoneNo}</td>
                  <td className="p-3">{new Date(log.time).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
