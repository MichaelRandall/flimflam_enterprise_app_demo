export interface MuscleGroup {
  muscle_group_id: number;
  name: string;
  muscle_group_description: string;
}

export interface Exercise {
  exercise_id: number;
  name: string;
  exercise_description: string | null;
  is_push: boolean;
  is_pull: boolean;
  is_bodyweight: boolean;
  is_compound: boolean;
  requires_weights: boolean;
  is_home_friendly: boolean;
  // Included for API responses that join muscle groups
  muscle_groups?: MuscleGroup[]; 
}
