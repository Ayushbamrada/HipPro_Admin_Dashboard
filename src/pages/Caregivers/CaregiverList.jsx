import { useEffect, useState } from "react";
import { getAllCaregivers } from "../../api/caregiverApi";

export default function CaregiverList() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaregivers();
  }, []);

  const loadCaregivers = async () => {
    try {
      const data = await getAllCaregivers();
      setCaregivers(data);
    } catch (err) {
      console.error("Error loading caregivers:", err);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Caregivers</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
          </tr>
        </thead>

        <tbody>
          {caregivers.length > 0 ? (
            caregivers.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phoneNo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No caregivers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
