/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const token = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (token) {
        return (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        );
      }
      return <Redirect to="/login" />;
    }}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default PrivateRoute;
