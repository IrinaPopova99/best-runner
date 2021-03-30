import { v4 as uuid4 } from 'uuid';

let workouts = [
    {
        "id": "1m",
        "date": "12.06.2021",
        "typeWorkout": "Бег",
        "kilometrage": "500", 
        "comment": "1 l2f 22fыы1 2121 212 ыыa 444j"
    },
    {
        "id": "2m",
        "date": "12.06.2021",
        "typeWorkout": "Ходьба",
        "kilometrage": "1000", 
        "comment": "1 l2f 2 444j"
    },
    {
        "id": "3m",
        "date": "02.06.2021",
        "typeWorkout": "Бег",
        "kilometrage": "100", 
        "comment": "1 2ы1 2121 212 ыыa 444j"
    }
];

export const getWorkouts = (req, res) => {   
    res.send(workouts);
};

export const getWorkoutById = (req, res) => {   
    const { id } = req.params;
    const foundWorkout = workouts.find((workout) => workout.id === id);
    res.send(foundWorkout);
};

export const createWorkout = (req, res) => {
    let workout = req.body;
    workout.date = workout.date.split('-').reverse().join('.');
    const workoutWithId = { ...workout, id: uuid4() };
    workouts.push(workoutWithId);
    res.send(workoutWithId);
}

export const deleteWorkout = (req, res) => {
    const ids = req.params.id.split(',')
    workouts = workouts.filter((workout) => !ids.find(id => workout.id === id));
    res.send(workouts);
}

export const updateWorkout = (req, res) => {
    const { id } = req.params;
    const { date, typeWorkout, kilometrage, comment } = req.body;

    const workout = workouts.find((workout) => workout.id === id);
    
    if (date) workout.date = date.split('-').reverse().join('.');
    if (typeWorkout) workout.typeWorkout = typeWorkout;
    if (kilometrage) workout.kilometrage = kilometrage;
    if (comment) workout.comment = comment;

    res.send(workout);
}