import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MathLogic extends Component {
  EvaluateOpp = () => {
    let { first, second } = this.props;
    const { operator } = this.props;
    first = Number(first);
    second = Number(second);
    const allOpp = ['+', '-', '*', '/'];
    if (allOpp.includes(operator)) {
      switch (operator) {
      case '+':
        return (first + second);
      case '-':
        return first - second;
      case '*':
        return (first * second);
      case '/':
        return (first / second);
      default:
        return ('invalid operation');
      }
    } else {
      return ('invalid solution');
    }
  }


  render() {
    const { operation, first, second } = this.props;
    return (

      <>
        {operation}
        {' '}
of
        {first}
        {' '}
and
        {second}
        {' '}
is
        {this.EvaluateOpp()}
        {' '}
        <br />
      </>
    );
  }
}

MathLogic.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  operator: PropTypes.oneOf(['+', '-', '*', '/']).isRequired,
  operation: PropTypes.string.isRequired,
};

export default MathLogic;
