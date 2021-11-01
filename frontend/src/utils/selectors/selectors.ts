import { createSelector } from "reselect";
import { RootState } from "../../shared/types";
import { filterWorkouts } from "../filter/filterFunctions";
import { getWorkoutsWithCorrectDateFormat } from "../date/getWorkoutsWithCorrectDateFormat";

const getVisibleFilters = (state: RootState) => state.filtersReducer.filters;

// export const getWorkouts = (state: RootState) =>
//   getWorkoutsWithCorrectDateFormat(state.workoutSlice.workouts || []);

// export const getVisibleWorkouts = createSelector(
//   [getVisibleFilters, getWorkouts],
//   (filters, workouts) => {
//     if (filters.length !== 0) {
//       return filterWorkouts(workouts, filters);
//     }
//     return workouts;
//   }
// );

// export const getTypesWorkouts = createSelector([getWorkouts], (workouts) =>
//   workouts.map((workout) => workout.typeWorkout)
// );
