import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserTestHistory } from "../../api/testApi";

export default function UserTestHistory() {
  const { id } = useParams();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const data = await getUserTestHistory(id);
      setTests(data);
    } catch (err) {
      console.error("Error loading test history:", err);
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
      <h1 className="text-3xl font-bold mb-6">Test History</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Test Type</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tests.length > 0 ? (
            tests.map((t) => (
              <tr key={t._id} className="border-b">
                <td className="p-3">{t.type}</td>
                <td className="p-3">{t.score || "N/A"}</td>
                <td className="p-3">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Link
                    className="text-blue-600 underline"
                    to={`/test-history/${t._id}`}
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No test history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
