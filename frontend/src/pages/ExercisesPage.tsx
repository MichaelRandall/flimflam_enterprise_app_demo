import { useFetch } from '../hooks/useFetch';
import { getExercises } from '../services/exerciseService';
import { type Exercise } from '../types';

export function ExercisesPage() {
  const { data: exercises, loading, error } = useFetch<Exercise[]>(getExercises);

  if (loading) return <p>Loading movements...</p>;
  if (error) return <p>Error loading exercises.</p>;

  return (
    <div>
      <h1>Exercise Library</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Muscle Groups</th>
          </tr>
        </thead>
        <tbody>
          {exercises?.map(ex => (
            <tr key={ex.exercise_id}>
              <td>{ex.name}</td>
              <td>{ex.is_bodyweight ? 'Bodyweight' : 'Weighted'}</td>
              <td>
                {/* Add a ?. before map AND a fallback empty array [] */}
                {(ex.muscle_groups || [])
                    .filter(mg => mg !== null) // Filter out any nulls from the join
                    .map(mg => mg.name)
                    .join(', ')}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
