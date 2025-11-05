// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getUserById } from "../../api/userApi";
// import { getUserSOSHistory } from "../../api/sosApi";

// import ActivityChart from "../../components/charts/ActivityChart";
// import AssignExercise from "../../components/exercises/AssignExercise";
// import UserExerciseList from "../../components/exercises/UserExerciseList";

// export default function UserDetails() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [sos, setSOS] = useState([]);

//   useEffect(() => {
//     loadUser();
//      fetchSOS();
//   }, []);

//   const loadUser = async () => {
//     try {
//       const data = await getUserById(id);
//       setUser(data);
//     } catch (err) {
//       console.error("Error fetching user:", err);
//     }
//   };
//    const fetchSOS = async () => {
//     try {
//       const logs = await getUserSOSHistory(id);
//       setSOS(logs);
//     } catch (err) {
//       console.error("Error fetching SOS logs:", err);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">User Details</h1>

//       {/* ✅ Basic Info */}
//       <div className="bg-white p-5 rounded shadow">
//         <h2 className="text-xl font-semibold mb-2">Basic Information</h2>

//         <p><b>Name:</b> {user.fullName}</p>
//         <p><b>Phone:</b> {user.phoneNo}</p>
//         <p><b>Age:</b> {user.age}</p>
//         <p><b>Gender:</b> {user.gender}</p>
//       </div>

//       {/* ✅ Device Info */}
//       <div className="bg-white p-5 rounded shadow">
//         <h2 className="text-xl font-semibold mb-2">Device Information</h2>
//         <p><b>Device MAC Address:</b> {user.deviceAddress}</p>
//       </div>

//       {/* ✅ Caregivers */}
//       <div className="bg-white p-5 rounded shadow">
//         <h2 className="text-xl font-semibold mb-2">Caregivers</h2>

//         {user.caregivers?.length === 0 && (
//           <p>No caregivers added.</p>
//         )}

//         <ul className="list-disc pl-6">
//           {user.caregivers?.map((c) => (
//             <li key={c._id}>
//               {c.name} — {c.email} ({c.phoneNo})
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* ✅ Activity Charts
//       <ActivityChart title="Sitting" data={user.sitting || []} />
//       <ActivityChart title="Standing" data={user.standing || []} />
//       <ActivityChart title="Walking" data={user.walking || []} />
//       <ActivityChart title="Laying" data={user.laying || []} /> */}

//       {/* ✅ Tests */}
//       {/* <ActivityChart title="30s Sit-to-Stand" data={user.thirtysec || []} />
//       <ActivityChart title="5x Sit-to-Stand" data={user.fivetimestitostand || []} />
//       <ActivityChart title="TUG Test" data={user.tug || []} /> */}

//       {/* ✅ Exercise Management */}
//       {/* <AssignExercise userId={user._id} />
//       <UserExerciseList userId={user._id} /> */}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import { getUserSOSHistory } from "../../api/sosApi";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [sos, setSOS] = useState([]);

  useEffect(() => {
    loadUser();
    loadSOS();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const loadSOS = async () => {
    try {
      const logs = await getUserSOSHistory(id);
      setSOS(logs);
    } catch (err) {
      console.error("Error fetching SOS logs:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Details</h1>

      {/* ✅ Basic Info */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Basic Information</h2>

        <p><b>Name:</b> {user.fullName}</p>
        <p><b>Phone:</b> {user.phoneNo}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>Gender:</b> {user.gender}</p>
      </div>

      {/* ✅ Device Info */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Device Information</h2>

        <p><b>MAC Address:</b> {user.deviceAddress}</p>
        <p><b>Serial Number:</b> {user.deviceSerialNumber}</p>
        <p><b>Stride Number:</b> {user.deviceStrideNumber}</p>
        <p><b>Last Synced:</b> {user.lastSynced}</p>
      </div>

      {/* ✅ Caregivers */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Caregivers</h2>

        {user.caregivers?.length === 0 ? (
          <p>No caregivers added.</p>
        ) : (
          <ul className="list-disc pl-6">
            {user.caregivers.map((c) => (
              <li key={c._id}>
                {c.name} — {c.email} ({c.phoneNo})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ SOS Logs */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">SOS Alerts</h2>

        {sos.length === 0 ? (
          <p>No SOS alerts found.</p>
        ) : (
          <ul className="space-y-2">
            {sos.map((log) => (
              <li key={log._id} className="border p-3 rounded">
                <p>
                  <b>Type:</b>{" "}
                  {log.type === "manual" ? "Manual SOS" : "Fall Detected"}
                </p>
                <p>
                  <b>Time:</b> {new Date(log.time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
