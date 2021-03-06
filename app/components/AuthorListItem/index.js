/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/**
 *
 * AuthorListItem
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
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
  padding: 0 20px 0 15px;
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

const Button = styled.button`
  width: 140px;
  margin: 5px 15px 5px 5px;
  background: rgb(255, 128, 0);
  border-width: 0;
  border-radius: 5px;
  align-items: center;
  height: 20px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const ClickableSpan = styled.span`
  color: blue;
  &:hover {
    background-color: palevioletred;
    color: white;
    cursor: pointer;
  }
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
    batchHideBooks,
    // hidden,
  } = props;

  const [maxBooks, setMaxBooks] = useState(3);

  const changeBooksShown = () => setMaxBooks(maxBooks !== 3 ? 3 : books.length);

  const hideBooks = () => batchHideBooks(books, true);

  const goToBook = book => () =>
    history.push({
      pathname: '/books',
      search: `?${qs.stringify({ q: book.title })}`,
    });

  return (
    <Container first={props.first}>
      <Details>
        <DetailLine>
          <BoldSpan>Full Name: </BoldSpan>
          <span>{full_name}</span>
        </DetailLine>
        <DetailLine>
          <BoldSpan>Origin: </BoldSpan>
          <span>{origin}</span>
          <BoldSpan> GR: </BoldSpan>
          <span>{gr_id}</span>
        </DetailLine>

        <DetailLine>
          <BoldSpan>Matilda ID: </BoldSpan>
          <span>{matilda_id}</span>
        </DetailLine>
        {duplicate ? (
          <DetailLine>
            <BoldSpan>Duplicate: </BoldSpan>
            <span>{duplicate.matilda_id}</span>
          </DetailLine>
        ) : null}
        <DetailLine>
          <BoldSpan>Books Written:</BoldSpan>
          <span>{books.length}</span>
        </DetailLine>
        <Button onClick={hideBooks}>Hide all books</Button>
      </Details>
      <Books>
        <DetailLine>
          <BoldSpan>Books: </BoldSpan>
        </DetailLine>
        {books.map((book, index) =>
          index < maxBooks ? (
            <DetailLine key={book.text_id} onClick={goToBook(book)}>
              <ClickableSpan>{`- ${book.title}`}</ClickableSpan>
            </DetailLine>
          ) : null,
        )}
        {books.length > 3 ? (
          <Button onClick={changeBooksShown}>{maxBooks <= 3 ? 'See All' : 'Collapse'}</Button>
        ) : null}
      </Books>
    </Container>
  );
}

AuthorListItem.propTypes = {};

export default withRouter(AuthorListItem);
