import { object, string } from 'yup';
export const password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

export const signUpSchema = object({
  body: object({
    email: string().email("It is not email").required("Password is required"),
    password: string()
      .required("Password is required")
      .min(8, "Minimum 8 characters")
      .matches(password, 'Password should include at least one letter (uppercase and lowercase) and one number'),
  }),
});
