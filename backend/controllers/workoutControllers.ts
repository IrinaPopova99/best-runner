import { v4 as uuid4 } from "uuid";
import { workouts } from "../data/workouts";
import { TypeWorkout, Workout } from "../types/workout";
import { isIncomingIdsIncludesId } from "../utils/isIncomingIdsIncludesId";

export const getWorkouts = (req, res) => {
  try {
    const { size, page, filter } = req.query;
    // console.log({ size, page, filter });

    const filteredWorkouts = getFilteredData(workouts, filter);
    const workoutsWithPagination = getPaginatedData(
      filteredWorkouts,
      +size,
      +page
    );
    const totalPages = !!(+size && +page) ? Math.ceil(workouts.length / +size) : 1;
    // console.log(!!(+size && +page));
    // console.log(Math.floor(workouts.length / +size));    

    res.send({
      workouts: workoutsWithPagination,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something goes wrong");
  }
};

function getFilteredData(data: Workout[], filter?: string) {
  if (filter) {
    return data.filter((item) => filter.includes(item.typeWorkout));
  }
  return data;
}

function getPaginatedData(data: Workout[], size: number, page: number) {
  if (size && page) {
    return data.slice(size * (page - 1), size * page);
  }
  return data;
}

export const getWorkoutById = (req, res) => {
  try {
    const { id } = req.params;
    const foundWorkout = workouts.find((workout) => workout.id === id);
    res.send(foundWorkout);
  } catch (error) {
    res.status(500).send();
  }
};

export const createWorkout = (req, res) => {
  try {
    let workout = req.body;
    const workoutWithId = { ...workout, id: uuid4() };
    workouts.push(workoutWithId);
    res.send(workoutWithId);
  } catch (error) {
    res.status(500).send();
  }
};

export const deleteWorkout = (req, res) => {
  try {
    const ids: string[] = req.params.id.split(",");
    console.log(ids);
    const indexesForDeleting = workouts.map(function (workout, i) {
      if (isIncomingIdsIncludesId(workout.id, ids)) return i;
    });
    console.log(indexesForDeleting);
    indexesForDeleting.forEach((index) => {
      if (index || index === 0 ) {
        workouts.splice(index, 1);
      }
    });
    console.log(workouts.length);

    res.send(workouts);
  } catch (error) {
    res.status(500).send();
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
    if (comment) workout.comment = comment;

    res.send(workout);
  } catch (error) {
    res.status(500).send();
  }
};
