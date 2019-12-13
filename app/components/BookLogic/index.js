/**
 *
 * BookLogic
 *
 */

import React, { useState } from 'react';
import qs from 'qs';
import BookListItemEditMode from 'components/BookListItemEditMode';
import BookListItem from 'components/BookListItem';
import { validateEditFields } from 'containers/Books/validations';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BookLogic(props) {
  const { book, edit, hideBook } = props;
  const [isBeingModified, setModify] = useState(false);

  const searchLexile = search => {
    const queryString = qs.stringify({ q: search });
    console.log(queryString);
    return fetch(
      `https://matilda.whooosreading.org/api/v1/lexile_records?${queryString}`,
      {
        method: 'GET',
      },
    )
      .then(r => r.json())
      .then(r => r.lexile_records)
      .catch(error => {
        console.error(error);
        return [];
      });
  };

  const saveChanges = changes => {
    const validatedChanges = validateEditFields(book, changes);
    if (Object.keys(validatedChanges).length > 0) edit(book, validatedChanges);
  };

  const toggleHideBook = () => hideBook([book], !book.hidden);

  if (isBeingModified)
    return (
      <BookListItemEditMode
        modify={setModify}
        saveChanges={saveChanges}
        searchLexile={searchLexile}
        {...props}
      />
    );
  return (
    <BookListItem
      toggleHideBook={toggleHideBook}
      modify={setModify}
      searchLexile={searchLexile}
      {...props}
    />
  );
}

BookLogic.propTypes = {};

export default BookLogic;
