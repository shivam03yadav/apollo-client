import React from 'react';
import PropTypes from 'prop-types';
import { Input, Err } from './style';

function TextField(props) {
  const {
    error, arg, onChange, input, onBlur, disable,
  } = props;
  return (
    <>
      <p><b>{ input }</b></p>
      <Input className={(error === '') ? ' ' : 'error'} type="text" name={arg} placeholder={arg} disabled={disable} onChange={onChange} onBlur={onBlur} />
      <Err className={(error === '') ? 'noerror' : 'error'}>
        <>
          { error }
        </>
      </Err>
    </>
  );
}
TextField.propTypes = {
  input: PropTypes.string,
  arg: PropTypes.string,
  disable: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
TextField.defaultProps = {
  input: '',
  arg: '',
  disable: '',
  error: '',
};
export default TextField;
