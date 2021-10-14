import { createSelector } from "reselect";
import { RootState } from "../shared/types";
import { filterData } from './filterFunctions';

const getVisibilityFilter = (state: RootState) => state.filtersReducer.filters;
const getWorkouts = (state: RootState) => { console.log(state.workoutSlice.workouts); return state.workoutSlice.workouts; }

export const getVisibleWorkouts = createSelector(
  [getVisibilityFilter, getWorkouts],
  (filters, workouts) => {
    if (filters.length !== 0) {
      return filterData(workouts, filters);
    }
    return workouts;
  }
);

export const getTypesWorkouts = createSelector([getWorkouts], (workouts) =>
  workouts.map((workout) => workout.typeWorkout)
);
