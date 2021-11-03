"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutTypes = void 0;
const getWorkoutTypes = (workouts) => {
    const typesWorkout = new Set();
    workouts.forEach((item) => typesWorkout.add(item.typeWorkout));
    return Array.from(typesWorkout);
};
exports.getWorkoutTypes = getWorkoutTypes;
//# sourceMappingURL=getTypesWorkout.js.map