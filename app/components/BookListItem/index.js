/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/**
 *
 * BookListItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
// import messages from './messages';

const Container = styled.div`
  max-height: 170px;
  margin: 10px 20px;
  padding: 10px 25px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: flex;
  flex-direction: row;
  ${({ first }) => !first && `border-top-width: thin;`}
`;

const BookImg = styled.img`
  height: 100%;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const DetailLine = styled.div`
  margin: 5px;
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

const Duplicates = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  padding: 0 20x 0 15px;
`;

const DeleteButton = styled.button`
  width: 16px;
  margin: 5px 15px 5px 5px;
  background: rgb(255, 128, 0);
  border-width: 0;
  border-radius: 5px;
  align-items: center;
  height: 20px;
  padding: 0;
  justify-content: center;
  display: inline-block;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const Button = styled.button`
  width: 120px;
  margin: 5px 15px 5px 5px;
  background: rgb(255, 128, 0);
  border-width: 0;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: white;
  cursor: pointer;
  ${({ selected }) => selected && `height: 40px;`}
  ${({ searchingForDuplicates }) => searchingForDuplicates && `height: 40px;`}
`;

function BookListItem(props) {
  const {
    title,
    text_id,
    // gr_id,
    cover_url,
    lexile_score,
    series,
    series_index,
    text_variety,
    author_full_name,
    history,
    // hidden,
    selectBaseBook,
    book,
    selected,
    clearSelection,
    selectDuplicate = f => f,
    searchingForDuplicates = f => f,
    duplicatedBooks,
    clearDuplicate,
  } = props;

  const setSelected = () => selectBaseBook(book);
  const setAsDuplicate = () => selectDuplicate(book);
  const deleteDuplicate = duplicateBook => () => clearDuplicate(duplicateBook);

  const goToAuthor = author => () =>
    history.push({
      pathname: '/authors',
      search: `?full_name=${author}`,
    });

  return (
    <Container first={props.first}>
      <BookImg
        src={
          cover_url ||
          'http://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
        }
      />
      <Details>
        <DetailLine>
          <BoldSpan>TEXT ID: </BoldSpan>
          <span>{text_id}</span>
        </DetailLine>
        <DetailLine>
          <ClickableSpan onClick={goToAuthor(author_full_name)}>
            <BoldSpan>Author: </BoldSpan>
            <span>{author_full_name}</span>
          </ClickableSpan>
          <BoldSpan> Lexile: </BoldSpan>
          <span>{lexile_score}</span>
        </DetailLine>
        <DetailLine>
          <BoldSpan>Title: </BoldSpan>
          <span>{title}</span>
        </DetailLine>
        {series ? (
          <DetailLine>
            <BoldSpan>Series Name: </BoldSpan>
            <span>{series}</span>
            <BoldSpan> Series Index: </BoldSpan>
            <span>{series_index}</span>
          </DetailLine>
        ) : null}
        <DetailLine>
          <BoldSpan>Variety: </BoldSpan>
          <span>{text_variety}</span>
        </DetailLine>
      </Details>

      <Duplicates>
        {selected ? (
          <Button selected onClick={clearSelection}>
            Clear Selection
          </Button>
        ) : !selected && searchingForDuplicates ? (
          <Button searchingForDuplicates onClick={setAsDuplicate}>
            Mark as Duplicate
          </Button>
        ) : (
          <Button onClick={setSelected}>Select</Button>
        )}
        {duplicatedBooks && duplicatedBooks.length > 0
          ? duplicatedBooks.map(duplicatedBook => (
              <DetailLine >
                {duplicatedBook.title}
                <DeleteButton onClick={deleteDuplicate(duplicatedBook)}>X</DeleteButton>
              </DetailLine>
            ))
          : null}
      </Duplicates>
    </Container>
  );
}

BookListItem.propTypes = {};

export default withRouter(BookListItem);
