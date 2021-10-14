import { combineReducers } from 'redux';
import workoutSlice from './workouts/workoutSlice';
import { filtersReducer } from './filter/reducer';

export const rootReducer = combineReducers({
  workoutSlice,
  filtersReducer,
});