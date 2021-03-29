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