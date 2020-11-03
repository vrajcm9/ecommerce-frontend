import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated().user.role === 'user' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
