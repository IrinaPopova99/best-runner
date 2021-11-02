import { v4 as uuid4 } from "uuid";
import { errorMessage } from "../constants/errors";
import { workouts } from "../data/workouts";
import { getFilteredData } from "../utils/getFilteredData";
import { getPaginatedData } from "../utils/getPaginatedData";
import { getWorkoutTypes } from "../utils/getTypesWorkout";
import { isIncomingIdsIncludesId } from "../utils/isIncomingIdsIncludesId";

export const getWorkouts = (req, res) => {
  try {
    const { size, page, filter } = req.query;

    const filteredWorkouts = getFilteredData(workouts, filter);
    const workoutsWithPagination = getPaginatedData(
      filteredWorkouts,
      +size,
      +page
    );
    const totalPages = !!(+size && +page) ? Math.ceil(filteredWorkouts.length / +size) : 1;
    const typesWorkout = getWorkoutTypes(workouts);

    res.send({
      workouts: workoutsWithPagination,
      totalPages,
      typesWorkout,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(errorMessage);
  }
};

export const getWorkoutById = (req, res) => {
  try {
    const { id } = req.params;
    const foundWorkout = workouts.find((workout) => workout.id === id);

    res.send(foundWorkout);
  } catch (error) {
    res.status(500).send(errorMessage);
  }
};

export const createWorkout = (req, res) => {
  try {
    const workout = req.body;
    const workoutWithId = { ...workout, id: uuid4() };

    workouts.push(workoutWithId);

    res.send(workoutWithId);
  } catch (error) {
    res.status(500).send(errorMessage);
  }
};

export const deleteWorkout = (req, res) => {
  try {
    const ids: string[] = req.params.id.split(",");

    const indexesForDeleting = workouts.map(function (workout, i) {
      if (isIncomingIdsIncludesId(workout.id, ids)) return i;
    });

    indexesForDeleting.forEach((index) => {
      if (index || index === 0 ) {
        workouts.splice(index, 1);
      }
    });

    res.send(workouts);
  } catch (error) {
    res.status(500).send(errorMessage);
  }
};

export const updateWorkout = (req, res) => {
  try {
    const { id } = req.params;
    const { date, typeWorkout, distance, comment } = req.body;

    const workout = workouts.find((workout) => workout.id === id);

    if (date) workout.date = date;
    if (typeWorkout) workout.typeWorkout = typeWorkout;
    if (distance) workout.distance = distance;
    if (comment || comment === '') workout.comment = comment;

    res.send(workout);
  } catch (error) {
    res.status(500).send(errorMessage);
  }
};
