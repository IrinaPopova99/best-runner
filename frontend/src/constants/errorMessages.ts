import { ErrorRequest } from "../shared/types";

export const smthGoesWrong: ErrorRequest =
  "Что-то пошло не так. Попробуйте позже";

export const workoutValidationErrorMessages = {
  fieldRequired: "Поле обязательное",
  maxLength: (maxLength: number) => `Максимум ${maxLength} символов`,
  isNotNumber: "Это не число",
  onlyElement: "Можно выбрать только 1 элемент",
};

export const errorMessages = {
  invalidEmail: 'Invalid email',
  requiredField: 'Required',
  passwordLength: 'Minimum 8 characters',
  passwordCharacters:
    'Password should include at least one letter (uppercase and lowercase) and one number',
  tooLong: 'Too long',
  link: 'It should be a link',
  typeNumber: 'It must be a number',
  minNumber: 'It must be bigger than 0',
  minNumberFiles: 'Add at least one file or idea',
  passwordMustMatch: 'Passwords must match',
  leaveOnlyPasswordOrEmail: 'Leave the only email or password',
  wasNotSaved: 'Oops, something went wrong. Try again please',
};