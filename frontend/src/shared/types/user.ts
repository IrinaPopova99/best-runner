import { Workout } from "./workout";

export type User = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  password: string;
  workouts: Workout[];
}

export type SignInUser = {
  password: string;
  email: string;
};

export type SignUpForm = User & { confirmPassword: string; };