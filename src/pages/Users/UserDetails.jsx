import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import { getUserSOSHistory } from "../../api/sosApi";
import { User, Phone, Shield, Activity, Bell, Mail, Calendar } from "lucide-react";

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

  if (!user)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="space-y-10">

      {/* ✅ Title */}
      <h1 className="text-3xl font-bold">User Profile</h1>

      {/* ✅ Top 2 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ✅ Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User size={22} /> Basic Information
          </h2>

          <div className="space-y-3 text-gray-700">
            <p><b>Name:</b> {user.fullName}</p>
            <p><b>Phone:</b> {user.phoneNo}</p>
            <p><b>Age:</b> {user.age}</p>
            <p><b>Gender:</b> {user.gender}</p>
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* ✅ Device Information */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield size={22} /> Device Information
          </h2>

          <div className="space-y-3 text-gray-700">
            <p><b>MAC Address:</b> {user.deviceAddress}</p>
            {/* <p><b>Serial Number:</b> {user.deviceSerialNumber}</p> */}
            {/* <p><b>Stride Number:</b> {user.deviceStrideNumber}</p> */}
            {/* <p><b>Last Synced:</b> {user.lastSynced || "Not Synced"}</p> */}
          </div>
        </div>
      </div>

      {/* ✅ Caregivers Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Phone size={22} /> Caregivers
        </h2>

        {user.caregivers?.length === 0 ? (
          <p className="text-gray-500">No caregivers assigned.</p>
        ) : (
          <div className="space-y-4">
            {user.caregivers.map((cg) => (
              <div
                key={cg._id}
                className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-1"
              >
                <p className="font-semibold text-lg text-gray-800">{cg.name}</p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} /> {cg.phoneNo}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} /> {cg.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ SOS Logs Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Bell size={22} /> SOS Alerts
        </h2>

        {sos.length === 0 ? (
          <p className="text-gray-500">No SOS logs found.</p>
        ) : (
          <div className="space-y-4">
            {sos.map((log) => (
              <div
                key={log._id}
                className="p-4 border rounded-lg bg-red-50"
              >
                <p className="font-semibold text-red-700">
                  {log.type === "manual" ? "Manual SOS" : "Fall Detected"}
                </p>
                <p className="text-gray-700">
                  <b>Time:</b> {new Date(log.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
