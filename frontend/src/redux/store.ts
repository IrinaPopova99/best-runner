import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { workoutApi } from '../api/workoutApi';

export const store = configureStore({ 
  reducer:
    // [workoutApi.reducerPath]: workoutApi.reducer,
    rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workoutApi.middleware),
});