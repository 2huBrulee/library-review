/* eslint-disable indent */
/**
 *
 * BookList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import BookListItem from '../BookListItem';
// import messages from './messages';

function BookList(props) {
  const {
    bookList,
    selectBaseBook,
    searchingForDuplicates,
    selectDuplicate,
    clearDuplicate,
  } = props;

  return (
    <div>
      {bookList.length > 0
        ? bookList.map((book, index) => (
            <BookListItem
              searchingForDuplicates={searchingForDuplicates}
              selectDuplicate={selectDuplicate}
              selectBaseBook={selectBaseBook}
              first={index === 0}
              {...book}
              book={book}
              key={book.gr_id}
            />
          ))
        : null}
    </div>
  );
}

BookList.propTypes = {
  bookList: PropTypes.array,
};

export default BookList;
