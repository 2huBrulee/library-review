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
import BookLogic from '../BookLogic';
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
    hideBook,
    edit,
  } = props;

  return (
    <div>
      {bookList.length > 0
        ? bookList.map((book, index) => (
            <BookLogic
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
              hideBook={hideBook}
              edit={edit}
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
