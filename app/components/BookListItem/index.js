/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/**
 *
 * BookListItem
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
// import messages from './messages';
import Checkbox from 'react-simple-checkbox';

const Container = styled.div`
  max-width: 800px;
  align-items: stretch;
  margin: 10px 10px;
  padding: 10px 5px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: flex;
  flex-direction: row;
  ${({ first }) => !first && `border-top-width: thin;`}
`;

const BookImg = styled.img`
  display: block;
  height: max-content;
  width: 120px;
`;

const Details = styled.div`
  flex: 1;
  max-width: 440px;
  display: block;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const Buttons = styled.div`
  flex: 1;
  max-width: 160px;
  display: block;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const DetailLine = styled.div`
  margin: 5px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
  ${({ maxWidth }) => maxWidth && `width: ${maxWidth}px`}
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
  height: inherit;
  display: flex;
  flex-direction: column;
  padding: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
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
  margin: 5px auto;
  background: #fafafa;
  border-color: #ff8000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #ff8000;
  cursor: pointer;
  ${({ selected }) => selected && `height: 25px;`}
  ${({ searchingForDuplicates }) => searchingForDuplicates && `height: 40px;`}
`;

const TrustedButton = styled.button`
  width: 120px;
  margin: 5px auto;
  background-color: #fafafa;
  border-color: green;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: green;
  cursor: pointer;
  ${({ trusted }) => trusted && `color: #fafafa; background-color: green`}
`;

const StyledCheckbox = styled(Checkbox)`
  margin: 0 10px 0 0;
`;

const DuplicateBook = styled.div`
  display: flex;
  flex-direction: row;
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
    trusted,
    hidden,
    duplicate,
    book,
    selected,
    clearSelection,
    selectDuplicate = f => f,
    duplicatedBooks,
    clearDuplicate,
    setTrust,
    checked,
  } = props;

  const changeTrust = () => setTrust([book], !trusted);

  const changeCheck = () =>
    checked ? clearDuplicate(book) : selectDuplicate(book);

  const setSelected = () => selectBaseBook(book);
  const deleteDuplicate = duplicateBook => () => clearDuplicate(duplicateBook);

  const goToAuthor = author => () =>
    history.push({
      pathname: '/authors',
      search: `?full_name=${author}`,
    });

  return (
    <Container first={props.first}>
      {!selected ? (
        <StyledCheckbox
          color="#FF8000"
          size={3}
          tickSize={3}
          borderThickness={1}
          checked={checked}
          backAnimationDuration={50}
          tickAnimationDuration={300}
          onChange={changeCheck}
        />
      ) : null}
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
          <BoldSpan>Title: </BoldSpan>
          <span>{title}</span>
        </DetailLine>
        <DetailLine>
          <ClickableSpan onClick={goToAuthor(author_full_name)}>
            <BoldSpan>Author: </BoldSpan>
            <span>{author_full_name}</span>
          </ClickableSpan>
          <BoldSpan> Lexile: </BoldSpan>
          <span>{lexile_score}</span>
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
          <BoldSpan>Hidden: </BoldSpan>
          <span>{hidden ? 'true ' : 'false '}</span>
          <BoldSpan>Variety: </BoldSpan>
          <span>{text_variety}</span>
        </DetailLine>
        <DetailLine>
          <BoldSpan>Duplicate: </BoldSpan>
          <span>{duplicate || '-'}</span>
        </DetailLine>
      </Details>
      <Buttons>
        <TrustedButton onClick={changeTrust} trusted={trusted}>
          {trusted ? 'trusted' : 'trust'}
        </TrustedButton>
        <Duplicates>
          {selected ? (
            <Button selected onClick={clearSelection}>
              Clear
            </Button>
          ) : (
            <Button onClick={setSelected}>Reference</Button>
          )}
          {duplicatedBooks && duplicatedBooks.length > 0 && selected
            ? duplicatedBooks.map(duplicatedBook => (
                <DuplicateBook>
                  <DetailLine maxWidth={100} title={duplicatedBook.title}>
                    {duplicatedBook.title}
                  </DetailLine>
                  <DeleteButton onClick={deleteDuplicate(duplicatedBook)}>
                    X
                  </DeleteButton>
                </DuplicateBook>
              ))
            : null}
        </Duplicates>
      </Buttons>
    </Container>
  );
}

BookListItem.propTypes = {};

export default withRouter(BookListItem);
