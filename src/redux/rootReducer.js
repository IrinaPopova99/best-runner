import { combineReducers } from 'redux';
import { workoutReducer } from './workouts/reducer';

export const rootReducer = combineReducers({
    workoutReducer,
});