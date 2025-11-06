// import { useEffect, useState } from "react";
// import { getAllUsers } from "../../api/userApi";
// import { Link } from "react-router-dom";

// export default function UsersList() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     const loadUsers = async () => {
//         try {
//             const list = await getAllUsers();
//             setUsers(Array.isArray(list) ? list : []);
//         } catch (err) {
//             console.error("Error fetching users:", err);
//             setUsers([]);
//         }
//     };

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-6">All Users</h1>

//             <table className="w-full border">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-3 text-left">Name</th>
//                         <th className="p-3 text-left">Phone</th>
//                         <th className="p-3 text-left">Age</th>
//                         <th className="p-3 text-left">Gender</th>
//                         <th className="p-3 text-left">Details</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {users.length > 0 ? (
//                         users.map((u) => (
//                             <tr key={u._id}>
//                                 <td className="p-3">{u.fullName}</td>
//                                 <td className="p-3">{u.phoneNo}</td>
//                                 <td className="p-3">{u.age}</td>
//                                 <td className="p-3">{u.gender}</td>

//                                 <td className="p-3">
//                                     <Link className="text-blue-600 underline" to={`/users/${u._id}`}>
//                                         View
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="text-center p-3">
//                                 No users found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import { Link, useLocation } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ NEW
  const location = useLocation();

  useEffect(() => {
    loadUsers();
  }, [location.pathname]);

  const loadUsers = async () => {
    try {
      setLoading(true);  // ✅ Start loading
      const list = await getAllUsers();
      setUsers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  // ✅ Show spinner when loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Details</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td className="p-3">{u.fullName}</td>
                <td className="p-3">{u.phoneNo}</td>
                <td className="p-3">{u.age}</td>
                <td className="p-3">{u.gender}</td>

                <td className="p-3">
                  <Link
                    className="text-blue-600 underline"
                    to={`/users/${u._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
