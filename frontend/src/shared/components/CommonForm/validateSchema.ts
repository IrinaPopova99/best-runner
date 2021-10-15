import * as Yup from "yup";
import {
  maxNumberLength,
  maxTextLength,
  regExpForNumber,
  workoutValidationErrorMessages,
} from "../../../constants";

export const { fieldRequired, isNotNumber, maxLength } =
  workoutValidationErrorMessages;

export const validateSchema = Yup.object().shape({
  date: Yup.date().required(fieldRequired),
  typeWorkout: Yup.string().required(fieldRequired),
  kilometrage: Yup.string()
    .required(fieldRequired)
    .max(maxNumberLength, maxLength(maxNumberLength))
    .matches(regExpForNumber, isNotNumber),
  comment: Yup.string().max(maxTextLength, maxLength(maxTextLength)),
});
