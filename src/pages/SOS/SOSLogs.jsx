import { useEffect, useState } from "react";
import { getAllSOSHistory } from "../../api/sosApi";

export default function SOSLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true); // ✅ Show spinner
      const data = await getAllSOSHistory();
      console.log("SOS logs:", data);
      setLogs(data);
    } catch (err) {
      console.error("Error loading SOS logs:", err);
    } finally {
      setLoading(false); // ✅ Hide spinner
    }
  };

  // ✅ Loading Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SOS Alerts</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="p-3">{log?.userId?.fullName}</td>
                <td className="p-3">{log?.userId?.phoneNo}</td>
                <td className="p-3 font-semibold text-red-600">
                  Fall Detected
                </td>
                <td className="p-3">
                  {new Date(log.time).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No SOS logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
