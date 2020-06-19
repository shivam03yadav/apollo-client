import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './style';

function ButtonFunction(props) {
  const { value, disabled, onClick } = props;
  return (
    <>
      <Button type={value} disabled={disabled} onClick={onClick}>
        {value}
      </Button>
    </>
  );
}
ButtonFunction.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonFunction.defaultProps = {
  disabled: false,
};
export default ButtonFunction;
