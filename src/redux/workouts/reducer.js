import types from './types';

let initialState = {
    workouts: [],
    isLoading: false,
    error: null,
};

export const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_WORKOUTS:
            return {
                ...state,
                workouts: action.payload
            }
        case types.DELETE_WORKOUT:
            return {
                ...state,
                workouts: action.payload
            }
        case types.ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload]
            }
        case types.EDIT_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.map(workout => {
                    if (workout.id === action.payload.id) {
                        return {
                            ...workout, 
                            id: action.payload.id, 
                            date: action.payload.date,
                            typeWorkout: action.payload.typeWorkout,
                            kilometrage: action.payload.kilometrage,
                            comment: action.payload.comment,
                        }
                    }
                    return workout;
                })
            }
        case types.ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}