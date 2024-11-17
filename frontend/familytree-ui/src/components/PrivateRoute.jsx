import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authToken, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        authToken ? <Component {...rest} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
