import instance from "./instance";

export const getWorkouts = () => {
    return (     
        instance.get(``)
            .then((res) => { return res.data; })
            .catch((error) => { return error; })
    );
};

export const deleteWorkout = (ids) => {
    return (
        instance.delete(`${ids}`)
            .then((res) => { return res.data; })
            .catch((error) => { return error; })
    );
};

export const addWorkout = (data) => {
    return (
        instance.post(``, data)
            .then((res) => { return res.data; })
            .catch((error) => { return error; })
    );
};

export const editWorkout = (id, data) => {
    return (
        instance.patch(`${id}`, data)
            .then((res) => { return res.data; })
            .catch((error) => { return error; })
    );
};