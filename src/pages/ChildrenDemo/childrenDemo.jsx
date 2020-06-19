import React, { Component } from 'react';
import { MathLogic } from '../../components/index';

class Children extends Component {
  constructor() {
    super();
    this.state = {
      calculation: [
        { operation: 'sum', operator: '+' },
        { operation: 'subtract', operator: '-' },
        { operation: 'multiplication', operator: '*' },
        { operation: 'division', operator: '/' },
      ],
    };
  }

  render() {
    const { calculation } = this.state;
    return (
      <>
        <MathLogic
          operation={calculation[0].operation}
          first="7"
          operator={calculation[0].operator}
          second="0"
        />
        <MathLogic
          operation={calculation[1].operation}
          first="9"
          operator={calculation[1].operator}
          second="2"
        />
        <MathLogic
          operation={calculation[2].operation}
          first="4"
          operator={calculation[2].operator}
          second="2"
        />
        <MathLogic
          operation={calculation[3].operation}
          first="7"
          operator={calculation[3].operator}
          second="0"
        />
      </>
    );
  }
}
export default Children;
