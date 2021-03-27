import { v4 as uuid4 } from 'uuid';

let workouts = [];

export const getWorkouts = (req, res) => {   
    res.send(workouts);
};

export const getWorkoutById = (req, res) => {   
    const { id } = req.params;
    const foundWorkout = workouts.find((workout) => workout.id === id);
    res.send(foundWorkout);
};

export const createWorkout = (req, res) => {
    const workout = req.body;
    workouts.push({ ...workout, id: uuid4() });
    res.send(`Workout: ${workout.typeWorkout}`);
}

export const deleteWorkout = (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter((workout) => workout.id !== id)
    res.send(`Workout ${id} was deleted `);
}

export const updateWorkout = (req, res) => {
    const { id } = req.params;
    const { data, typeWorkout, kilomatrage, comment } = req.body;

    const workout = workouts.find((workout) => workout.id === id);
    
    if (data) workout.data = data;
    if (typeWorkout) workout.typeWorkout = typeWorkout;
    if (kilomatrage) workout.kilomatrage = kilomatrage;
    if (comment) workout.comment = comment;

    res.send(`Workout ${id} was updated`);
}
