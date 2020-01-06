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
import BookLogic from 'components/BookLogic';
import messages from './messages';
import AuthorListItem from '../AuthorListItem';

const Wrapper = styled.div`
  border-style: solid;
  border-width: thin;
  border-color: rgb(255, 128, 0);
  overflow: hidden;
`;

function SelectedItem(props) {
  const {
    book,
    author,
    clearSelection,
    clearDuplicate,
    duplicatedBooks,
    dispatchCreateQuestion,
    dispatchEditQuestion,
    hideBook,
  } = props;
  return (
    <Sticky
      topOffset={-55}
      stickyStyle={{
        backgroundColor: '#fafafa',
        margin: '55px 0 0 0',
        boxShadow: '0 4px 2px -2px lightgray',
        zIndex: 99999,
      }}
    >
      <Wrapper>
        <BookLogic
          first
          selected
          book={book}
          {...book}
          hideBook={hideBook}
          clearSelection={clearSelection}
          duplicatedBooks={duplicatedBooks}
          clearDuplicate={clearDuplicate}
          createQuestion={dispatchCreateQuestion}
          editQuestion={dispatchEditQuestion}
        />
      </Wrapper>
    </Sticky>
  );
}

SelectedItem.propTypes = {};

export default SelectedItem;
