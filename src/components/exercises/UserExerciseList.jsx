import { useEffect, useState } from "react";
import { getUserAssignedExercises } from "../../api/exerciseApi";

export default function UserExerciseList({ userId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const res = await getUserAssignedExercises(userId);
    setRecords(res.records || res);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Assigned Exercises</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Exercise Names</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r.date}</td>
              <td className="p-3">
                {r.assignedExercises
                  .map((ex) => ex.name)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
