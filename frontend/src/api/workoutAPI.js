import instance from "./instance";

export const getWorkouts = () => {
    return (     
        instance.get(``)
            .then((res) => res.data)
    );
};

export const deleteWorkout = (ids) => {
    return (
        instance.delete(`${ids}`)
            .then((res) => res.data)
    );
};

export const addWorkout = (data) => {
    return (
        instance.post(``, data)
            .then((res) => res.data)
    );
};

export const editWorkout = (id, data) => {
    return (
        instance.patch(`${id}`, data)
            .then((res) => res.data)
    );
};