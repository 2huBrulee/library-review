/**
 *
 * ClickableText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { margin } from 'styled-system';

const StyledSpan = styled.span`
  ${margin};
  color: blue;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

function ClickableText(props) {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
}

ClickableText.propTypes = {
  children: PropTypes.element,
};

export default ClickableText;
