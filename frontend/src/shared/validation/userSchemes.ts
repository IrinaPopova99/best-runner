import * as Yup from "yup";
import { errorMessages } from "../../constants";

export const password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
export const passwordMinLength = 8;

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMessages.invalidEmail)
    .required(errorMessages.requiredField),
  password: Yup.string()
    .required(errorMessages.requiredField)
    .min(passwordMinLength, errorMessages.passwordLength)
    .matches(password, errorMessages.passwordCharacters),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMessages.invalidEmail)
    .required(errorMessages.requiredField),
  password: Yup.string()
    .required(errorMessages.requiredField)
    .min(passwordMinLength, errorMessages.passwordLength)
    .matches(password, errorMessages.passwordCharacters),
  firstName: Yup.string().required(errorMessages.requiredField),
  lastName: Yup.string().required(errorMessages.requiredField),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], errorMessages.passwordMustMatch)
    .required(errorMessages.requiredField),
});
