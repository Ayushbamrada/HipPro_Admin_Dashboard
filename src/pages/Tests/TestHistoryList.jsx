import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

export default function TestHistoryList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    const { data } = await api.get("/tests");
    setTests(data.tests || data);
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">Balance Tests</h1>

      <div className="space-y-4">
        {tests.map((t) => (
          <div key={t._id} className="bg-white p-5 rounded shadow">
            <p><b>User:</b> {t.userId?.fullName}</p>
            <p><b>Type:</b> {t.testType}</p>
            <p><b>Total Reps:</b> {t.totalReps}</p>
            <p><b>Total Time:</b> {t.totalTimeSeconds}s</p>
            <p><b>IMU Points:</b> {t.imuDataStream.length}</p>
            <p><b>Date:</b> {new Date(t.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
