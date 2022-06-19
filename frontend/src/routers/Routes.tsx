import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as urls from '../constants/urls';
import { SignUp } from '../components/SignUp/SignUp';
import ChartPage from '../components/Chart/ChartPage';
import { SignIn } from '../components/SignIn/SignIn';
import { WorkoutsTable } from '../components/Table/WorkoutsTable';
import { PrivateRoute } from './PrivateRoute';

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path={urls.baseUrl} component={WorkoutsTable} />
    <Route exact path={urls.signInUrl}>
      <SignIn />
    </Route>
    <Route exact path={urls.signUpUrl}>
      <SignUp />
    </Route>
    <PrivateRoute
      exact
      path={urls.chartUrl}
      component={ChartPage}
    />
  </Switch>
);
