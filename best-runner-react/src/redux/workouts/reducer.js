import types from './types';

let initialState = {
    workouts: [],
    isLoading: false
};

export const workoutReducer = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}