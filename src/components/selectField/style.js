import styled from 'styled-components';

const Select = styled.select`
  width: 99%;
  padding: 1%;
  margin-left: 10px &.error {
    border: 1px solid red;
    text-color: red;
  }
  &.noerror {
    display: none;
  }
`;
const Err = styled.div`
  &.error {
    color: red;
  }
  &.noerror {
    display: none;
  }
`;
export { Select, Err };
