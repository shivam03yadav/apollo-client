import React from 'react';
import PropTypes from 'prop-types';
import { Select, Err } from './style';

function SelectField(props) {
  const {
    input, error, onChange, options, onBlur, defaultText,
  } = props;
  return (
    <>
      <p><b>{input}</b></p>
      <Select className={(error === '') ? '' : 'error'} onChange={onChange} error={error} onBlur={onBlur}>
        {defaultText && <option>{defaultText}</option>}
        {
          options && options.length
          && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
      <Err className={(error === '') ? 'noerror' : 'error'}>
        <p>{error}</p>
      </Err>
    </>
  );
}

export default SelectField;

SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  input: PropTypes.string,
  defaultText: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};
SelectField.defaultProps = {
  error: '',
  input: '',
  options: [],
  defaultText: 'Select',
};
