/**
 *
 * Checkbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  color: black;
  font-size: 16px;
`;

const StyledCheckbox = styled.div`
  position: absolute;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background: white;
  border: 1px solid ${props => props.theme.borderColor};
`;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  opacity: 0;
  z-index: 1;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:hover ~ ${StyledCheckbox} {
    background: ${props => props.theme.borderColor};
    &::after {
      content: '';
      display: block;
      border-radius: 3px;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: ${props => props.theme.backgroundColor};
    }
  }
  &:checked + ${StyledCheckbox} {
    background: ${props => props.theme.mainColor};
    border: 1px solid ${props => props.theme.mainColor};
    &::after {
      content: '';
      display: block;
      border-radius: 3px;
      width: 12px;
      height: 12px;
      margin: 6px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
      background: ${props => props.theme.backgroundColor};
    }
  }
`;

function Checkbox(props) {
  const { label } = props;
  return (
    <Wrapper>
      <HiddenCheckbox {...props} />
      <StyledCheckbox />
      {label && label}
    </Wrapper>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
};

export default Checkbox;
