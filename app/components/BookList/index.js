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
  const { bookList } = props;

  return (
    <div>
      {bookList.length > 0
        ? bookList.map((book, index) => (
          <BookListItem first={index === 0} {...book} key={book.gr_id} />
        ))
        : null}
    </div>
  );
}

BookList.propTypes = {
  bookList: PropTypes.array,
};

export default BookList;
