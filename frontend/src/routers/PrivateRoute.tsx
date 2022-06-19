import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as urls from '../constants/urls';
import { SignInContext } from '../context';

type PrivateRouteProps = {
  path: string;
  exact?: boolean | undefined;
  component: React.FC;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  exact,
  component: RouteComponent,
}) => {
  const { isSignIn } = useContext(SignInContext);

  if (!isSignIn) {
    return <Redirect to={urls.signInUrl} />;
  }

  return (
    <Route exact={exact} path={path}>
      <RouteComponent />
    </Route>
  );
};
