import React, { useContext, useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { SignInUser } from "../../shared/types/user";
import { signInInitialValues } from "../../constants/initialValues";
import { SignInSchema } from "../../shared/validation/userSchemes";
import { SignInUpForm } from "./styled";
import { useGetUserQuery, useSignInMutation } from "../../api/userApi";
import { Redirect, useHistory } from "react-router-dom";
import * as urls from '../../constants/urls';
import { SignInContext } from "../../context";

export const SignIn: React.FC = () => {
  const [signIn, { isLoading, isSuccess, error }] = useSignInMutation();
  const { isSignIn } = useContext(SignInContext);

  const history = useHistory();

  const onSubmit = (data: SignInUser, bag: FormikHelpers<SignInUser>) => {
    bag.setSubmitting(false);
    signIn(data);
  };
  const { values, handleSubmit, errors, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: signInInitialValues,
      validationSchema: SignInSchema,
      onSubmit: (data: SignInUser, bag) => onSubmit(data, bag),
    });

  useEffect(() => {
    if (isSuccess) {
      console.log('was pushed');
      history.push(urls.baseUrl);
    }
  }, [isSuccess]);

  if (isSignIn) {
    return <Redirect to={urls.baseUrl} />;
  }

  return (
    <SignInUpForm onSubmit={handleSubmit}>
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
      {error && <div>{JSON.stringify(error)}</div>}
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <CircularProgress size={68} color="secondary" />
        ) : (
          "Sign in"
        )}
      </Button>
    </SignInUpForm>
  );
};
