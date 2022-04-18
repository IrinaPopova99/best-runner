import { Schema, model } from 'mongoose';

export interface IWorkout {
  _id: string;
  date: Date;
  typeWorkout: TypeOfWorkout;
  distance: number;
  comment: string;
}; 

export enum TypeOfWorkout {
  SKIING = 'Лыжи',
  WALKING = 'Ходьба',
  RUNNING = 'Бег',
  CYCLING = 'Велосипед',
}

const workoutSchema = new Schema<IWorkout>({
  date: { type: Date, required: true },
  typeWorkout: { type: String, enum: TypeOfWorkout, required: true },
  distance: { type: Number, required: true },
  comment: { type: String, required: false },
});

const WorkoutModel = model<IWorkout>('Workout', workoutSchema);

export default WorkoutModel;