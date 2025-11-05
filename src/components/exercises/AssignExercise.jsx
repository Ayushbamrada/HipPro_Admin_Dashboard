import { useEffect, useState } from "react";
import { getAllExercises, assignExercisesToUser } from "../../api/exerciseApi";

export default function AssignExercise({ userId }) {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const res = await getAllExercises();
    setExercises(res.exercises || res);
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const submit = async () => {
    if (!date) return alert("Please select a date");

    await assignExercisesToUser({
      userId,
      date,
      assignedExercises: selected
    });

    alert("Exercises Assigned!");
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-3">Assign Exercises</h2>

      <label className="font-semibold">Select Date</label>
      <input
        type="date"
        className="border rounded p-2 block mt-1 mb-3"
        onChange={(e) => setDate(e.target.value)}
      />

      <h3 className="font-semibold mb-2">Select Exercises</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {exercises.map((ex) => (
          <div
            key={ex._id}
            onClick={() => toggleSelect(ex._id)}
            className={`cursor-pointer p-3 border rounded-lg ${
              selected.includes(ex._id)
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-50"
            }`}
          >
            <p className="font-semibold">{ex.name}</p>
            <p className="text-sm text-gray-600">{ex.category}</p>
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Assign
      </button>
    </div>
  );
}
