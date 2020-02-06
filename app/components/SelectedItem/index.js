/**
 *
 * SelectedItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import styled from 'styled-components';
import BookLogic from 'components/BookLogic';

const Wrapper = styled.div`
  border: 1px solid #ff8000;
  border-radius: 5px;
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
  );
}

SelectedItem.propTypes = {};

export default SelectedItem;
