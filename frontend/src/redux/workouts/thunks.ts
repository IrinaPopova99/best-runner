import {
  getWorkouts,
  deleteWorkout,
  addWorkout,
  editWorkout,
} from "../../api/workoutAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Workout } from "../../shared/types";

export const getWorkoutsAll = createAsyncThunk(
  "workout/getWorkoutsAll",
  async () => {
    const response = await getWorkouts();
    return response;
  }
);
export const deleteWorkoutById = createAsyncThunk(
  "workout/deleteWorkoutById",
  async (ids: string[]) => {
    const response = await deleteWorkout(ids);
    return response;
  }
);
export const addNewWorkout = createAsyncThunk(
  "workout/addNewWorkout",
  async (data: Workout) => {
    const response = await addWorkout(data);
    return response;
  }
);
export const editOneWorkout = createAsyncThunk(
  "workout/editOneWorkout",
  async (data: { id: string; workout: Workout }) => {
    const response = await editWorkout(data.id, data.workout);
    return response;
  }
);
