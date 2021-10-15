import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorRequest, Workout } from "../../shared/types";
import {
  addNewWorkout,
  deleteWorkoutById,
  editOneWorkout,
  getWorkoutsAll,
} from "./thunks";

type InitialStateWorkout = {
  workouts: Workout[];
  isLoading: boolean;
  error: ErrorRequest;
};

let initialState: InitialStateWorkout = {
  workouts: [],
  isLoading: true,
  error: "",
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getWorkoutsAll.fulfilled,
        (state, action: PayloadAction<any>) => ({
          ...state,
          workouts: action.payload,
          isLoading: false,
          error: null,
        })
      )
      .addCase(getWorkoutsAll.rejected, (state, action: any) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(getWorkoutsAll.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(
        deleteWorkoutById.fulfilled,
        (state, action: PayloadAction<any>) => ({
          ...state,
          workouts: action.payload,
          isLoading: false,
          error: null,
        })
      )
      .addCase(deleteWorkoutById.rejected, (state, action: any) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(deleteWorkoutById.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(
        addNewWorkout.fulfilled,
        (state, action: PayloadAction<any>) => ({
          ...state,
          workouts: [...state.workouts, action.payload],
          isLoading: false,
          error: null,
        })
      )
      .addCase(addNewWorkout.rejected, (state, action: any) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(addNewWorkout.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(
        editOneWorkout.fulfilled,
        (state, action: PayloadAction<any>) => ({
          ...state,
          workouts: state.workouts.map((workout) => {
            if (workout.id === action.payload.id) {
              return {
                ...workout,
                id: action.payload.id,
                date: action.payload.date,
                typeWorkout: action.payload.typeWorkout,
                kilometrage: action.payload.kilometrage,
                comment: action.payload.comment,
              };
            }
            return workout;
          }),
          isLoading: false,
          error: null,
        })
      )
      .addCase(editOneWorkout.rejected, (state, action: any) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(editOneWorkout.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addDefaultCase((state) => state);
  },
});

export default workoutSlice.reducer;
