import instance from "./instance";

export const getWorkouts = () => {
    return (     
        instance.get(`workout`)
            .then((res) => { return res.data; })
    );
};

export const deleteWorkout = (ids) => {
    return (
        instance.delete(`workout/${ids}`)
            .then((res) => { return res.data; })
    );
};

export const addWorkout = (data) => {
    return (
        instance.post(`workout`, data)
            .then((res) => { return res.data; })
    );
};

export const editWorkout = (id, data) => {
    return (
        instance.patch(`workout/${id}`, data)
            .then((res) => { return res.data; })
    );
};