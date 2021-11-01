import { Workout } from "../shared/types";
import { instance } from "./instance";

export const getWorkouts = (page?: number, size?: number): Promise<Workout> => {
  return instance
    .get(``, {
      params: {
        size,
        page,
      },
    })
    .then((res) => res.data);
};

export const deleteWorkout = (ids: string[]): Promise<Workout> => {
  return instance.delete(`${ids}`).then((res) => res.data);
};

export const addWorkout = (data: Workout): Promise<Workout> => {
  return instance.post(``, data).then((res) => res.data);
};

export const editWorkout = (id: string, data: Workout): Promise<Workout> => {
  return instance.patch(`${id}`, data).then((res) => res.data);
};
