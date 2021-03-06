/**
 *
 * StickyToolBar
 *
 */

import React from 'react';
import Sticky from 'react-sticky-el';
import styled from 'styled-components';

const StyledSticky = styled(Sticky)`
  background-color: #fafafa;
  &.sticky {
    ${({ showingMoreOptions }) =>
      showingMoreOptions ? `margin: 135px 0 0 0;` : `margin: 55px 0 0 0;`};
    box-shadow: 0 4px 2px -2px lightgray;
    z-index: 5;
  }
  &.holder {
    ${({ hasContent }) => !hasContent && `max-height: 0;`};
  }
`;

const hasContent = children => children.reduce((pv, cv) => !!cv || pv, false);

export default ({ children, showingMoreOptions, ...props }) => (
  <StyledSticky
    className="holder"
    topOffset={showingMoreOptions ? -135 : -55}
    hasContent={hasContent(children)}
    showingMoreOptions={showingMoreOptions}
    {...props}
  >
    {children}
  </StyledSticky>
);
