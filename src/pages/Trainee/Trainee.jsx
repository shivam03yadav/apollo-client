/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropType from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
    </Switch>
  );
}
Trainee.propTypes = {
  match: PropType.object.isRequired,
};

export default Trainee;
