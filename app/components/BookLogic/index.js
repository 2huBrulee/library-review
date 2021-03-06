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
import base64 from 'base-64';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BookLogic(props) {
  const { book, edit, hideBook } = props;
  const [isBeingModified, setModify] = useState(false);

  const searchLexile = search => {
    const queryString = qs.stringify({ q: search });
    return fetch(
      `https://matilda.whooosreading.org/api/v1/lexile_records?${queryString}`,
      {
        method: 'GET',
        headers: new Headers({
          Authorization: `Basic ${base64.encode(
            `${localStorage.getItem('username')}:${localStorage.getItem(
              'password',
            )}`,
          )}`,
        }),
      },
    )
      .then(r => r.json())
      .then(r => r.lexile_records)
      .catch(() => []);
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
