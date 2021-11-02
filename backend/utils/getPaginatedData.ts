import { Workout } from "../types/workout";

export const getPaginatedData = (
  data: Workout[],
  size: number,
  page: number
): Workout[] => {
  if (size && page) {
    return data.slice(size * (page - 1), size * page);
  }
  return data;
};
