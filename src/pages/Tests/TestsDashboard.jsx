import { useEffect, useState } from "react";
import { getAllTestHistory } from "../../api/testApi";
import { Activity, History, BarChart, Users } from "lucide-react";

export default function TestsDashboard() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sts30, setSTS30] = useState(0);
  const [sts5, setSTS5] = useState(0);
  const [tug, setTUG] = useState(0);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const data = await getAllTestHistory();
      setTests(data);

      // ✅ Count types
      setSTS30(data.filter(t => t.testType === "30sSTS").length);
      setSTS5(data.filter(t => t.testType === "5xSTS").length);
      setTUG(data.filter(t => t.testType === "TUG").length);

    } catch (err) {
      console.error("Error loading tests:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ✅ Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Test Dashboard</h1>
        <p className="text-gray-600">Overview of all recorded test results.</p>
      </div>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <BarChart size={36} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold">{tests.length}</h3>
            <p className="text-gray-500">Total Tests</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Activity size={36} className="text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">{sts30}</h3>
            <p className="text-gray-500">30s STS Tests</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <History size={36} className="text-orange-500" />
          <div>
            <h3 className="text-xl font-semibold">{sts5}</h3>
            <p className="text-gray-500">5x STS Tests</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Users size={36} className="text-purple-600" />
          <div>
            <h3 className="text-xl font-semibold">{tug}</h3>
            <p className="text-gray-500">TUG Tests</p>
          </div>
        </div>
      </div>

      {/* ✅ RECENT TEST HISTORY TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Test History</h2>

        {tests.length === 0 ? (
          <p className="text-gray-500">No test records found.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Test Type</th>
                <th className="p-3 text-left">Result</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {tests.map((t) => (
                <tr key={t._id} className="border-b">
                  <td className="p-3">{t.userId?.fullName}</td>
                  <td className="p-3">{t.testType}</td>

                  <td className="p-3">
                    {t.testType === "30sSTS" && `${t.totalReps} reps`}

                    {t.testType === "5xSTS" && `${t.totalTimeSeconds}s`}

                    {t.testType === "TUG" && `${t.totalTimeSeconds}s`}
                  </td>

                  <td className="p-3">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <a
                      className="text-blue-600 underline"
                      href={`/test-history/${t._id}`}
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
