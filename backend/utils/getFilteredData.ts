import { Workout } from "../types/workout";

export const getFilteredData = (
  data: Workout[],
  filter?: string
): Workout[] => {
  if (filter) {
    return data.filter((item) => filter.includes(item.typeWorkout));
  }
  return data;
};
