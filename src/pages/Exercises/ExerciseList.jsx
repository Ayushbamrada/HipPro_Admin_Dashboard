import { useEffect, useState } from "react";
import { getAllExercises } from "../../api/exerciseApi";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const res = await getAllExercises();
    setExercises(res.exercises || res);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Available Exercises</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {exercises.map((ex) => (
          <div key={ex._id} className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{ex.name}</h2>
            <p className="text-gray-600">{ex.description}</p>
            <span className="block mt-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {ex.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
