"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = exports.deleteWorkout = exports.createWorkout = exports.getWorkoutById = exports.getTypesWorkout = exports.getWorkouts = void 0;
const uuid_1 = require("uuid");
const workouts_1 = require("../data/workouts");
const isIncomingIdsIncludesId_1 = require("../utils/isIncomingIdsIncludesId");
const getWorkouts = (req, res) => {
    try {
        const { size, page, filter } = req.query;
        const filteredWorkouts = getFilteredData(workouts_1.workouts, filter);
        const workoutsWithPagination = getPaginatedData(filteredWorkouts, +size, +page);
        const totalPages = !!(+size && +page) ? Math.ceil(filteredWorkouts.length / +size) : 1;
        const typesWorkout = getTypesWorkout(workouts_1.workouts);
        res.send({
            workouts: workoutsWithPagination,
            totalPages,
            typesWorkout,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something goes wrong");
    }
};
exports.getWorkouts = getWorkouts;
function getFilteredData(data, filter) {
    if (filter) {
        return data.filter((item) => filter.includes(item.typeWorkout));
    }
    return data;
}
function getPaginatedData(data, size, page) {
    if (size && page) {
        return data.slice(size * (page - 1), size * page);
    }
    return data;
}
function getTypesWorkout(workouts) {
    const typesWorkout = new Set();
    workouts.forEach((item) => typesWorkout.add(item.typeWorkout));
    return Array.from(typesWorkout);
}
exports.getTypesWorkout = getTypesWorkout;
const getWorkoutById = (req, res) => {
    try {
        const { id } = req.params;
        const foundWorkout = workouts_1.workouts.find((workout) => workout.id === id);
        res.send(foundWorkout);
    }
    catch (error) {
        res.status(500).send();
    }
};
exports.getWorkoutById = getWorkoutById;
const createWorkout = (req, res) => {
    try {
        let workout = req.body;
        const workoutWithId = Object.assign(Object.assign({}, workout), { id: (0, uuid_1.v4)() });
        workouts_1.workouts.push(workoutWithId);
        res.send(workoutWithId);
    }
    catch (error) {
        res.status(500).send();
    }
};
exports.createWorkout = createWorkout;
const deleteWorkout = (req, res) => {
    try {
        const ids = req.params.id.split(",");
        console.log(ids);
        const indexesForDeleting = workouts_1.workouts.map(function (workout, i) {
            if ((0, isIncomingIdsIncludesId_1.isIncomingIdsIncludesId)(workout.id, ids))
                return i;
        });
        console.log(indexesForDeleting);
        indexesForDeleting.forEach((index) => {
            if (index || index === 0) {
                workouts_1.workouts.splice(index, 1);
            }
        });
        console.log(workouts_1.workouts.length);
        res.send(workouts_1.workouts);
    }
    catch (error) {
        res.status(500).send();
    }
};
exports.deleteWorkout = deleteWorkout;
const updateWorkout = (req, res) => {
    try {
        const { id } = req.params;
        const { date, typeWorkout, distance, comment } = req.body;
        const workout = workouts_1.workouts.find((workout) => workout.id === id);
        if (date)
            workout.date = date;
        if (typeWorkout)
            workout.typeWorkout = typeWorkout;
        if (distance)
            workout.distance = distance;
        if (comment)
            workout.comment = comment;
        res.send(workout);
    }
    catch (error) {
        res.status(500).send();
    }
};
exports.updateWorkout = updateWorkout;
//# sourceMappingURL=workoutControllers.js.map