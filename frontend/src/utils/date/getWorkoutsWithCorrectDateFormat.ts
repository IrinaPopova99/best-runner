import { Workout } from "../../shared/types";

export const getWorkoutsWithCorrectDateFormat = (workouts: Workout[]): Workout[] => {
  console.log(workouts)
  return workouts.map((item) => {
    const workout = { ...item };
    workout.date = new Date(item.date);
    return workout;
  });
};