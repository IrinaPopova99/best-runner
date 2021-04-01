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
const loadingAction = (isLoading) => ({
    type: types.LOADING,
    isLoading
});

export const getWorkoutsAll = () => dispatch => {
    getWorkouts()
        .then((data) => {
            dispatch(getWorkoutsAction(data));
            dispatch(loadingAction(false));
        })
        .catch((error) => dispatch(errorAction('Неполадки на сервере')));
}

export const deleteWorkoutById = (ids) => dispatch => {
    dispatch(loadingAction(true));
    deleteWorkout(ids)
        .then((data) => {
            dispatch(deleteWorkoutsAction(data));
            dispatch(loadingAction(false));
        })
        .catch((error) => dispatch(errorAction('Неполадки на сервере')));
}

export const addNewWorkout = (data) => dispatch => {
    dispatch(loadingAction(true));
    addWorkout(data)
        .then((data) => {
            dispatch(addWorkoutAction(data));
            dispatch(loadingAction(false));
        })
        .catch(() => dispatch(errorAction('Неполадки на сервере')));
}

export const editOneWorkout = (id, data) => dispatch => {
    dispatch(loadingAction(true));
    editWorkout(id, data)
        .then((data) => {
            dispatch(editWorkoutAction(data));
            dispatch(loadingAction(false));
        })
        .catch(() => dispatch(errorAction('Неполадки на сервере')));
}
