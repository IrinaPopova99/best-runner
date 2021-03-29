import types from './types';
import { getWorkouts, deleteWorkout } from './../../api/workoutAPI';

const getWorkoutsAction = (data) => ({
    type: types.GET_WORKOUTS,
    payload: data
});
const deleteWorkoutsAction = (data) => ({
    type: types.GET_WORKOUTS,
    payload: data
});

export const getWorkoutsAll = () => dispatch => getWorkouts().then((data) => dispatch(getWorkoutsAction(data)));

export const deleteWorkoutById = (ids) => dispatch => deleteWorkout(ids).then((data) => dispatch(deleteWorkoutsAction(data)))
