/**
 *
 * Button
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { margin } from 'styled-system';

const StyledButton = styled.button`
  ${margin};
  box-sizing: border-box;
  width: 128px;
  min-width: max-content;
  height: 38px;
  padding: 4px 8px;
  font-size: 16px;
  border: 1px solid #ff8000;
  border-radius: 5px;
  background-color: #fafafa;
  color: #ff8000;
  &:hover {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;

function Button(props) {
  return <StyledButton {...props} />;
}

Button.propTypes = {};

export default Button;
