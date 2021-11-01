import { v4 as uuid4 } from 'uuid';
import { Workout } from '../types/workout';

export let workouts: Workout[] = [
  {
    id: uuid4(),
    date: new Date(2020, 0, 1),
    typeWorkout: "Бег",
    distance: 10,
    comment: "Комментарий 1",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 3),
    typeWorkout: "Ходьба",
    distance: 20,
    comment: "Комментарий 2",
  },
  {
    id: uuid4(),
    date: new Date(2021, 0, 2),
    typeWorkout: "Бег",
    distance: 30,
    comment: "Комментарий 3",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 1),
    typeWorkout: "Бег",
    distance: 40,
    comment: "Комментарий 1",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 3),
    typeWorkout: "Ходьба",
    distance: 50,
    comment: "Комментарий 2",
  },
  {
    id: uuid4(),
    date: new Date(2021, 0, 2),
    typeWorkout: "Бег",
    distance: 60,
    comment: "Комментарий 3",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 1),
    typeWorkout: "Велосипед",
    distance: 70,
    comment: "Комментарий 1",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 3),
    typeWorkout: "Лыжи",
    distance: 80,
    comment: "Комментарий 2",
  },
  {
    id: uuid4(),
    date: new Date(2021, 0, 2),
    typeWorkout: "Лыжи",
    distance: 90,
    comment: "Комментарий 3",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 1),
    typeWorkout: "Велосипед",
    distance: 100,
    comment: "Комментарий 1",
  },
  {
    id: uuid4(),
    date: new Date(2020, 0, 3),
    typeWorkout: "Ходьба",
    distance: 200,
    comment: "Комментарий 2",
  },
  {
    id: uuid4(),
    date: new Date(2021, 0, 2),
    typeWorkout: "Бег",
    distance: 300,
    comment: "Комментарий 3",
  },
];
