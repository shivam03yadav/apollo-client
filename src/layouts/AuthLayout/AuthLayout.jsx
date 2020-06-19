/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/footer/index';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div>{ children}</div>
    <Footer />
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
