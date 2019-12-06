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
import BookListItemEditMode from '../BookListItemEditMode';
// import messages from './messages';

function BookList(props) {
  const {
    bookList,
    selectBaseBook,
    searchingForDuplicates,
    selectDuplicate,
    clearDuplicate,
    duplicatedBooks,
    setTrust,
  } = props;

  return (
    <div>
      {bookList.length > 0
        ? bookList.map((book, index) => (
            <BookListItem
              checked={
                !!duplicatedBooks.find(
                  duplicatedBook => book.text_id === duplicatedBook.text_id,
                )
              }
              duplicatedBooks={duplicatedBooks}
              clearDuplicate={clearDuplicate}
              searchingForDuplicates={searchingForDuplicates}
              selectDuplicate={selectDuplicate}
              selectBaseBook={selectBaseBook}
              setTrust={setTrust}
              first={index === 0}
              {...book}
              book={book}
              key={book.text_id}
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
