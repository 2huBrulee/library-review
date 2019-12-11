/**
 *
 * BookLogic
 *
 */

import React, { useState } from 'react';
import BookListItemEditMode from 'components/BookListItemEditMode';
import BookListItem from 'components/BookListItem';
import { validateEditFields } from 'containers/Books/validations';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BookLogic(props) {
  const { book, edit, hideBook } = props;
  const [isBeingModified, setModify] = useState(false);

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
        {...props}
      />
    );
  return (
    <BookListItem
      toggleHideBook={toggleHideBook}
      modify={setModify}
      {...props}
    />
  );
}

BookLogic.propTypes = {};

export default BookLogic;
