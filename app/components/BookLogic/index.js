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
  const { book, edit } = props;
  const [isBeingModified, setModify] = useState(false);

  const saveChanges = changes => {
    const validatedChanges = validateEditFields(book, changes);
    edit(book, validatedChanges);
  };

  if (isBeingModified)
    return (
      <BookListItemEditMode
        modify={setModify}
        saveChanges={saveChanges}
        {...props}
      />
    );
  return <BookListItem modify={setModify} {...props} />;
}

BookLogic.propTypes = {};

export default BookLogic;
