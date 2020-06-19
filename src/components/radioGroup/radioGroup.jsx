import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './style';

function RadioGroup(props) {
  const { error, onChange, options } = props;
  return (
    <>
      {options && options.length && options.map(({ value, label }) => (
        <Fragment key={label}>
          <Input type="radio" name="sport" value={value} onChange={onChange} error={error} />
          {label}
          <br />
        </Fragment>
      ))}
    </>
  );
}

RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
