import { v4 as uuid4 } from 'uuid';



let workouts = [
    {
        "id": uuid4(),
        "date": new Date(2020, 0, 1),
        "typeWorkout": "Бег",
        "kilometrage": "500", 
        "comment": "Комментарий 1"
    },
    {
        "id": uuid4(),
        "date": new Date(2020, 0, 3),
        "typeWorkout": "Ходьба",
        "kilometrage": "1000", 
        "comment": "Комментарий 2"
    },
    {
        "id": uuid4(),
        "date": new Date(2021, 0, 2),
        "typeWorkout": "Бег",
        "kilometrage": "100", 
        "comment": "Комментарий 3"
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
    
    if (date) workout.date = date;
    if (typeWorkout) workout.typeWorkout = typeWorkout;
    if (kilometrage) workout.kilometrage = kilometrage;
    if (comment) workout.comment = comment;

    res.send(workout);
}
