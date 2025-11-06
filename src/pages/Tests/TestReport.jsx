import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestHistoryById } from "../../api/testApi";

export default function TestReport() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getTestHistoryById(id);
    setTest(data);
  };

  if (!test)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Test Report</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Overview</h2>

        <p><b>User:</b> {test.userId?.fullName}</p>
        <p><b>Test Type:</b> {test.testType}</p>
        <p><b>Date:</b> {new Date(test.createdAt).toLocaleString()}</p>

        {test.testType === "30sSTS" && (
          <p><b>Total Reps:</b> {test.totalReps}</p>
        )}

        {test.testType !== "30sSTS" && (
          <p><b>Total Time:</b> {test.totalTimeSeconds}s</p>
        )}
      </div>

      {/* IMU DATA */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">IMU Data Stream</h2>

        <div className="overflow-auto max-h-[400px] border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Time (ms)</th>
                <th className="p-2">Accel L</th>
                <th className="p-2">Accel R</th>
                <th className="p-2">Gyro L</th>
                <th className="p-2">Gyro R</th>
              </tr>
            </thead>

            <tbody>
              {test.imuDataStream.map((d, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{d.timestampMillis}</td>
                  <td className="p-2">{d.accelerometer.leftX}, {d.accelerometer.leftY}, {d.accelerometer.leftZ}</td>
                  <td className="p-2">{d.accelerometer.rightX}, {d.accelerometer.rightY}, {d.accelerometer.rightZ}</td>
                  <td className="p-2">{d.gyroscope.leftX}, {d.gyroscope.leftY}, {d.gyroscope.leftZ}</td>
                  <td className="p-2">{d.gyroscope.rightX}, {d.gyroscope.rightY}, {d.gyroscope.rightZ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
