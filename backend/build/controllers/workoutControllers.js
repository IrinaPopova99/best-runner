"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = exports.deleteWorkout = exports.createWorkout = exports.getWorkoutById = exports.getWorkouts = void 0;
const uuid_1 = require("uuid");
const errors_1 = require("../constants/errors");
const workouts_1 = require("../data/workouts");
const getFilteredData_1 = require("../utils/getFilteredData");
const getPaginatedData_1 = require("../utils/getPaginatedData");
const getTypesWorkout_1 = require("../utils/getTypesWorkout");
const isIncomingIdsIncludesId_1 = require("../utils/isIncomingIdsIncludesId");
const getWorkouts = (req, res) => {
    try {
        const { size, page, filter } = req.query;
        const filteredWorkouts = (0, getFilteredData_1.getFilteredData)(workouts_1.workouts, filter);
        const workoutsWithPagination = (0, getPaginatedData_1.getPaginatedData)(filteredWorkouts, +size, +page);
        const totalPages = !!(+size && +page) ? Math.ceil(filteredWorkouts.length / +size) : 1;
        const typesWorkout = (0, getTypesWorkout_1.getWorkoutTypes)(workouts_1.workouts);
        res.send({
            workouts: workoutsWithPagination,
            totalPages,
            typesWorkout,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(errors_1.errorMessage);
    }
};
exports.getWorkouts = getWorkouts;
const getWorkoutById = (req, res) => {
    try {
        const { id } = req.params;
        const foundWorkout = workouts_1.workouts.find((workout) => workout.id === id);
        res.send(foundWorkout);
    }
    catch (error) {
        res.status(500).send(errors_1.errorMessage);
    }
};
exports.getWorkoutById = getWorkoutById;
const createWorkout = (req, res) => {
    try {
        const workout = req.body;
        const workoutWithId = Object.assign(Object.assign({}, workout), { id: (0, uuid_1.v4)() });
        workouts_1.workouts.push(workoutWithId);
        res.send(workoutWithId);
    }
    catch (error) {
        res.status(500).send(errors_1.errorMessage);
    }
};
exports.createWorkout = createWorkout;
const deleteWorkout = (req, res) => {
    try {
        const ids = req.params.id.split(",");
        const indexesForDeleting = workouts_1.workouts.map(function (workout, i) {
            if ((0, isIncomingIdsIncludesId_1.isIncomingIdsIncludesId)(workout.id, ids))
                return i;
        });
        indexesForDeleting.forEach((index) => {
            if (index || index === 0) {
                workouts_1.workouts.splice(index, 1);
            }
        });
        res.send(workouts_1.workouts);
    }
    catch (error) {
        res.status(500).send(errors_1.errorMessage);
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
        if (comment || comment === '')
            workout.comment = comment;
        res.send(workout);
    }
    catch (error) {
        res.status(500).send(errors_1.errorMessage);
    }
};
exports.updateWorkout = updateWorkout;
//# sourceMappingURL=workoutControllers.js.map