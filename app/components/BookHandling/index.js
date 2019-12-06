/**
 *
 * BookHandling
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Sticky from 'react-sticky-el';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Button = styled.button`
  width: 100px;
  margin: 5px 15px 5px 5px;
  background: rgb(255, 128, 0);
  border-width: 0;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0;
  justify-content: center;
  display: inline-block;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

function BookHandling(props) {
  const {
    selected = false,
    batchHide = f => f,
    batchLinking = f => f,
    batchTrust = f => f,
  } = props;

  return (
    <Sticky
      topOffset={selected ? -275 : -55}
      stickyStyle={{
        backgroundColor: '#fafafa',
        margin: `${selected ? 275 : 55}px 0 0 0`,
        boxShadow: '0 4px 2px -2px lightgray',
        zIndex: 99999,
      }}
    >
      <Wrapper>
        <Button onClick={batchHide}>Hide</Button>
        {selected && <Button onClick={batchLinking}>Link</Button>}
        <Button onClick={batchTrust(true)}>Mass Trust</Button>
        <Button onClick={batchTrust(false)}>Mass Distrust</Button>
      </Wrapper>
    </Sticky>
  );
}

BookHandling.propTypes = {};

export default BookHandling;
