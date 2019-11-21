/**
 *
 * SelectedItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Sticky from 'react-sticky-el';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import AuthorListItem from '../AuthorListItem';
import BookListItem from '../BookListItem';

const Reference = styled.div`
  margin: 10px 0 0 10px;
`;

const Wrapper = styled.div`
  border-style: solid;
  border-width: thin;
  border-color: rgb(255, 128, 0);
`;

const stickyStyle = styled.style`
  background-color: #fafafa;
  margin: 55px 0 0 0;
  box-shadow: 0 4px 2px -2px lightgray;
  z-index: 99999;
`;

function SelectedItem(props) {
  const {
    book,
    author,
    clearSelection,
    clearDuplicate,
    duplicatedBooks,
  } = props;
  return (
    <Sticky topOffset={-55} stickyStyle={stickyStyle}>
      <Wrapper>
        <Reference>Reference</Reference>
        <BookListItem
          first
          selected
          {...book}
          clearSelection={clearSelection}
          duplicatedBooks={duplicatedBooks}
          clearDuplicate={clearDuplicate}
        />
      </Wrapper>
    </Sticky>
  );
}

SelectedItem.propTypes = {};

export default SelectedItem;
