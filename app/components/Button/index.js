/**
 *
 * Button
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  box-sizing: content-box;
  min-width: 100px;
  height: 30px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ff8000;
  border-radius: 5px;
  background-color: #fafafa;
  color: #ff8000;
`;

function Button(props) {
  return <StyledButton {...props} />;
}

Button.propTypes = {};

export default Button;
