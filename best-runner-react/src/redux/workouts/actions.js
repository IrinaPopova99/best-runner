import types from './types';
import { getWorkouts, deleteWorkout, addWorkout, editWorkout } from './../../api/workoutAPI';

const getWorkoutsAction = (data) => ({
    type: types.GET_WORKOUTS,
    payload: data
});
const deleteWorkoutsAction = (data) => ({
    type: types.GET_WORKOUTS,
    payload: data
});
const addWorkoutAction = (data) => ({
    type: types.ADD_WORKOUT,
    payload: data
});
const editWorkoutAction = (data) => ({
    type: types.EDIT_WORKOUT,
    payload: data
});
const errorAction = (error) => ({
    type: types.ERROR,
    error
});

export const getWorkoutsAll = () => dispatch => getWorkouts()
    .then((data) => dispatch(getWorkoutsAction(data)))
    .catch(() => dispatch(errorAction('Неполадки на сервере')));

export const deleteWorkoutById = (ids) => dispatch => deleteWorkout(ids)
    .then((data) => dispatch(deleteWorkoutsAction(data)))
    .catch(() => dispatch(errorAction('Неполадки на сервере')));

export const addNewWorkout = (data) => dispatch => addWorkout(data)
    .then((data) => dispatch(addWorkoutAction(data)))
    .catch(() => dispatch(errorAction('Неполадки на сервере')));

export const editOneWorkout = (id, data) => dispatch => editWorkout(id, data)
    .then((data) => dispatch(editWorkoutAction(data)))
    .catch(() => dispatch(errorAction('Неполадки на сервере')));
