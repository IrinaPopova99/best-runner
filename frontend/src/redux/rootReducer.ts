import { combineReducers } from 'redux';
import { userApi } from '../api/userApi';
import { workoutApi } from '../api/workoutApi';

export const rootReducer = combineReducers({
  [workoutApi.reducerPath]: workoutApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});