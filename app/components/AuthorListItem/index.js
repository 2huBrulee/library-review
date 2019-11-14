/**
 *
 * AuthorListItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const Container = styled.div`
  margin: 10px 20px;
  padding: 10px 25px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: flex;
  flex-direction: column, mn;
  ${({ first }) => !first && `border-top-width: thin;`}
`;

const Books = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0 20x 0 15px;
`;

/*
const BookImg = styled.img`
  height: 100%;
`;
*/

const Details = styled.div`
  flex: 1;
  display: flex;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const DetailLine = styled.div`
  margin: 5px;
`;

function AuthorListItem(props) {
  const {
    full_name,
    origin,
    gr_id,
    matilda_id,
    duplicate,
    books,
    history,
    // hidden,
  } = props;

  const goToBook = book => () =>
    history.push({
      pathname: '/books',
      search: `?name=${book.title}`,
    });

  return (
    <Container first={props.first}>
      <Details>
        <DetailLine>{`Full Name: ${full_name}`}</DetailLine>
        <DetailLine>{`Origin: ${origin} GR: ${gr_id}`}</DetailLine>
        <DetailLine>{`Matilda ID: ${matilda_id}`}</DetailLine>
        {duplicate ? (
          <DetailLine>{`Duplicate: ${duplicate}`}</DetailLine>
        ) : null}
        <DetailLine>{`Books Written: ${books.length}`}</DetailLine>
      </Details>
      <Books>
        <DetailLine>Books: </DetailLine>
        {books.map((book, index) =>
          index < 3 ? <DetailLine onClick={goToBook(book)}>{`- ${book.title}`}</DetailLine> : null,
        )}
      </Books>
    </Container>
  );
}

AuthorListItem.propTypes = {};

export default withRouter(AuthorListItem);
