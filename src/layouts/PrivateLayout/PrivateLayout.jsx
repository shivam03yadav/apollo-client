/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <Navbar />
    <br />
    <div>
      { children}
    </div>
  </div>
);
PrivateLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
