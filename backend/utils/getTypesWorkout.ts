import { Workout } from "../types/workout";

export const getWorkoutTypes = (workouts: Workout[]): string[] => {
  const typesWorkout = new Set<string>();
  workouts.forEach((item) => typesWorkout.add(item.typeWorkout));

  return Array.from(typesWorkout);
};
