/**
 *
 * TextInput
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  box-sizing: content-box;
  min-width: 300px;
  height: 30px;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  background-color: #fafafa;
  font-size: 16px;
`;

function TextInput(props) {
  return <StyledTextInput {...props} />;
}

TextInput.propTypes = {};

export default TextInput;
