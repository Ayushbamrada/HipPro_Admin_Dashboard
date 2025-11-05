import { useEffect, useState } from "react";
import { getAllSOSHistory } from "../../api/sosApi";

export default function SOSLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getAllSOSHistory();
      console.log("SOS logs:", data);
      setLogs(data);
    } catch (err) {
      console.error("Error loading SOS logs:", err);
    }
  };

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
