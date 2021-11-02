import { combineReducers } from 'redux';
import { workoutApi } from '../api/workoutApi';

export const rootReducer = combineReducers({
  [workoutApi.reducerPath]: workoutApi.reducer,
});