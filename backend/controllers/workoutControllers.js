import { v4 as uuid4 } from 'uuid';

let workouts = [
    {
        "id": "1m",
        "date": "12.03.2021",
        "typeWorkout": "Бег",
        "kilometrage": "500", 
        "comment": "Комментарий к 12"
    },
    {
        "id": "2m",
        "date": "24.03.2021",
        "typeWorkout": "Ходьба",
        "kilometrage": "1000", 
        "comment": "Комментарий к 24 марта"
    },
    {
        "id": "3m",
        "date": "01.04.2021",
        "typeWorkout": "Бег",
        "kilometrage": "100", 
        "comment": "Комментарий к 01.04.2021"
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
