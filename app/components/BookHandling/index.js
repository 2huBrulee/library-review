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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const Button = styled.button`
  width: 100px;
  margin: 5px 15px 5px 5px;
  background: #0082c8;
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
    selectAll = f => f,
    duplicatedBooks,
  } = props;

  return (
    <Wrapper>
      {duplicatedBooks && duplicatedBooks.length > 0 && <Button onClick={batchHide}>Hide</Button>}
      {duplicatedBooks && duplicatedBooks.length > 0 && selected && <Button onClick={batchLinking}>Link</Button>}
      {duplicatedBooks && duplicatedBooks.length > 0 && <Button onClick={batchTrust(true)}>Trust</Button>}
      {duplicatedBooks && duplicatedBooks.length > 0 && <Button onClick={batchTrust(false)}>Distrust</Button>}
      <Button onClick={selectAll}>Select All</Button>
    </Wrapper>
  );
}

BookHandling.propTypes = {};

export default BookHandling;
