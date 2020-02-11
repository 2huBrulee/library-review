/* eslint-disable indent */
/**
 *
 * AuthorList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import AuthorListItem from '../AuthorListItem';

function AuthorList(props) {
  const { authorList, batchHideBooks } = props;

  return (
    <div>
      {authorList.length > 0
        ? authorList.map((author, index) => (
            <AuthorListItem
              first={index === 0}
              {...author}
              key={author.matilda_id}
              batchHideBooks={batchHideBooks}
            />
          ))
        : null}
    </div>
  );
}

AuthorList.propTypes = {};

export default AuthorList;
