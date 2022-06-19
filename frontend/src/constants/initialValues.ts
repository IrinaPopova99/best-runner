import { SignInUser, SignUpForm, User } from "../shared/types/user";

export const signInInitialValues: SignInUser = {
  email: "",
  password: "",
};

export const signUpInitialValues: SignUpForm = {
  email: "",
  password: "",
  workouts: [],
  lastName: "",
  firstName: "",
  avatar: "",
  confirmPassword: "",
};