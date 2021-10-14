import {
  getWorkouts,
  deleteWorkout,
  addWorkout,
  editWorkout,
} from "../../api/workoutAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Workout } from "../../shared/types";
import { smthGoesWrong } from "../../constants";

export const getWorkoutsAll = createAsyncThunk(
  "workout/getWorkoutsAll",
  async () => {
    try {
      const response = await getWorkouts();
      return response;
    } catch (err: any) {
      return smthGoesWrong;
    }
  }
);
export const deleteWorkoutById = createAsyncThunk(
  "workout/deleteWorkoutById",
  async (ids: string[]) => {
    try {
      const response = await deleteWorkout(ids);
      return response;
    } catch (err: any) {
      return smthGoesWrong;
    }
  }
);
export const addNewWorkout = createAsyncThunk(
  "workout/addNewWorkout",
  async (data: Workout) => {
    try {
      const response = await addWorkout(data);
      return response;
    } catch (err: any) {
      return smthGoesWrong;
    }
  }
);
export const editOneWorkout = createAsyncThunk(
  "workout/editOneWorkout",
  async (data: { id: string; workout: Workout }) => {
    try {
      const response = await editWorkout(data.id, data.workout);
      return response;
    } catch (err: any) {
      return smthGoesWrong;
    }
  }
);
