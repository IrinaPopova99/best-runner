import { IWorkout } from '../models/WorkoutModel';
import { Schema } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  password: string;
  workouts: Schema.Types.ObjectId[];
}

export type LoginUser = {
  password: string;
  email: string;
}