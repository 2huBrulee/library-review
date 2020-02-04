/**
 *
 * TextInput
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { margin, grid } from 'styled-system';

const StyledTextInput = styled.input`
  ${margin};
  ${grid};
  box-sizing: border-box;
  min-width: 128px;
  min-height: 38px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  padding: 4px 8px;
  color: #000000;
  background-color: hsl(0, 0%, 100%);
  font-size: 16px;
`;

function TextInput(props) {
  return <StyledTextInput {...props} />;
}

TextInput.propTypes = {};

export default TextInput;
