export interface WorkoutLocation {
  workout_location_id: number;
  workout_location: string;
  is_obsolete: boolean;
}

export interface Workout {
  workout_id: number;
  log_date: string; // ISO date string from Postgres
  workout_location_id: number;
  focus_id: number; // References muscle_group_id
}

export interface WorkoutSet {
  set_id: number;
  workout_id: number;
  exercise_id: number;
  set_number: number;
  weight_used: number | null;
  reps: number;
}
