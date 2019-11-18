/**
 *
 * NoSearchResults
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  margin: 5px 15px;
  padding: 15px 10px;
`;

function NoSearchResults() {
  return (
    <Wrapper>
      <FormattedMessage {...messages.header} />
    </Wrapper>
  );
}

NoSearchResults.propTypes = {};

export default NoSearchResults;
