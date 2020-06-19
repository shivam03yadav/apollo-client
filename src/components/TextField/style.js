import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  width: 98%;
  padding: 1%;
  &.error {
    border: 1px solid red;
    text-color: red;
  }
  &.noerror {
    display: none;
  }
`;
const Div = styled.div`
  border: 1px solid black;
  padding: 3px;
`;
const Err = styled.p`
  &.error {
    color: red;
  }
  &.noerror {
    display: none;
  }
`;
export { Input, Div, Err };
