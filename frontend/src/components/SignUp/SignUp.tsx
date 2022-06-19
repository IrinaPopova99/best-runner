import React, { useContext, useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { SignUpForm } from "../../shared/types/user";
import { signUpInitialValues } from "../../constants/initialValues";
import { SignUpSchema } from "../../shared/validation/userSchemes";
import { SignInUpForm } from "../SignIn/styled";
import { useSignUpMutation } from "../../api/userApi";
import { Link, Redirect } from "react-router-dom";
import * as urls from '../../constants/urls';
import { SignInContext } from "../../context";

export const SignUp: React.FC = () => {
  const [signUp, { isLoading, isSuccess, error,  }] = useSignUpMutation();
  const [wasSignedUp, setWasSignedUp] = useState(false);
  const { isSignIn } = useContext(SignInContext);

  const onSubmit = (data: SignUpForm, bag: FormikHelpers<SignUpForm>) => {
    bag.setSubmitting(false);
    signUp(data);
  };
  const { values, handleSubmit, errors, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: signUpInitialValues,
      validationSchema: SignUpSchema,
      onSubmit: (data: SignUpForm, bag) => onSubmit(data, bag),
    });

  useEffect(() => {
    setWasSignedUp(isSuccess);
  }, [isSuccess])

  if (isSignIn) {
    return <Redirect to={urls.baseUrl} />;
  }
  
  return (
    <SignInUpForm onSubmit={handleSubmit}>
      <TextField
        value={values.firstName}
        name="firstName"
        type="text"
        label="Your first name"
        error={!!errors.firstName && !!touched.firstName}
        helperText={errors.firstName}
        onChange={handleChange}
      />
      <TextField
        value={values.lastName}
        name="lastName"
        type="text"
        label="Your last name"
        error={!!errors.lastName && !!touched.lastName}
        helperText={errors.lastName}
        onChange={handleChange}
      />
      <TextField
        value={values.email}
        name="email"
        type="email"
        label="Email"
        error={!!errors.email && !!touched.email}
        helperText={errors.email}
        onChange={handleChange}
      />
      <TextField
        value={values.password}
        name="password"
        label="Password"
        type="password"
        error={!!errors.password && !!touched.password}
        helperText={errors.password}
        onChange={handleChange}
      />
      <TextField
        value={values.confirmPassword}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        error={!!errors.confirmPassword && !!touched.confirmPassword}
        helperText={errors.confirmPassword}
        onChange={handleChange}
      />
      {error && <div>{JSON.stringify(error)}</div>}
      {wasSignedUp && <div>You are signed up! <Link to={urls.signInUrl}>Sign in</Link></div>}
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <CircularProgress size={68} color="secondary" />
        ) : (
          "Sign up"
        )}
      </Button>
    </SignInUpForm>
  );
};
