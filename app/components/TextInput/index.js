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
  box-sizing: content-box;
  min-width: 128px;
  min-height: 32px;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 4px 8px;
  color: #000000;
  background-color: #fafafa;
  font-size: 16px;
`;

function TextInput(props) {
  return <StyledTextInput {...props} />;
}

TextInput.propTypes = {};

export default TextInput;
