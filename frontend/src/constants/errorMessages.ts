import { ErrorRequest } from "../shared/types";

export const smthGoesWrong: ErrorRequest =
  "Что-то пошло не так. Попробуйте позже";

export const workoutValidationErrorMessages = {
  fieldRequired: "Поле обязательное",
  maxLength: (maxLength: number) => `Максимум ${maxLength} символов`,
  isNotNumber: "Это не число",
  onlyElement: "Можно выбрать только 1 элемент",
};
