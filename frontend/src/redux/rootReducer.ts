import { combineReducers } from 'redux';
import workoutSlice from './workoutsSlice/workoutSlice';
import { filtersReducer } from './filter/reducer';
import { workoutApi } from './workouts/workoutApi';

export const rootReducer = combineReducers({
  [workoutApi.reducerPath]: workoutApi.reducer,
  filtersReducer,
});