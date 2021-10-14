import { Filter, Workout } from "../shared/types";

export const filterWorkouts = (array: Workout[], filters: Filter[]) =>
  array.filter(
    (workout) =>
      workout.typeWorkout ===
      filters.find((filter) => filter === workout.typeWorkout)
  );
