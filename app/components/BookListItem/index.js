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
import AsyncCustomSelect from 'components/AsyncCustomSelect';

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

const ImageContainer = styled.div`
  width: 120px;
`;

const BookImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const Details = styled.div`
  flex: 1;
  max-width: 440px;
  min-width: 440px;
  display: block;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const DetailsLarger = styled.div`
  flex: 1;
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
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const DetailLine = styled.div`
  margin: 5px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
  ${({ maxWidth }) => maxWidth && `width: ${maxWidth}px`}
`;

const DetailLineOverflow = styled.div`
  margin: 5px;
  height: 32px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 8px;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const BoldSpanSpaced = styled.span`
  font-weight: bold;
  margin: 0 0 0 8px;
`;

const Italics = styled.span`
  font-style: italic;
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
  min-width: 120px;
  margin: 15px 8px;
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
  margin: 15px 8px;
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

const HiddenButton = styled.button`
  width: 120px;
  margin: 15px 8px;
  background-color: #fafafa;
  border-color: darkgray;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: darkgray;
  cursor: pointer;
  ${({ hidden }) => hidden && `color: #fafafa; background-color: darkgray`}
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const StyledCheckbox = styled(Checkbox)`
  margin: 0 10px 0 0;
`;

const DuplicateBook = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 32px;
  height: 32px;
`;

const DivisionLine = styled.div`
  height: 3px;
  border: none;
  border-bottom: 1px solid lightgray;
`;

const ButtonIcon = styled.button`
  background-color: #fafafa;
  padding: 0;
  margin: 16px 0;
  width: max-content;
  height: max-content;
  color: #555555;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const EditLexileButtonIcon = styled.button`
  background-color: #fafafa;
  padding: 0;
  margin: 0;
  width: max-content;
  height: max-content;
  color: #ff8000;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const LexileButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DivideIntoRows = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Columns = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

function BookListItem(props) {
  const {
    title,
    text_id,
    // gr_id,
    cover_url,
    lexile_score,
    lexile_record,
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
    toggleHideBook,
    setTrust,
    checked,
    modify,
    searchLexile,
    edit,
  } = props;

  const [editingLexile, setEditingLexile] = useState(false);
  const [selectedLexile, setSelectedLexile] = useState(null);

  const editBookLexile = () => {
    if (selectedLexile) {
      if (!lexile_record || selectedLexile.id !== lexile_record.id) {
        edit(book, { lexile_record_id: selectedLexile.id });
      }
    }
    setEditingLexileFalse();
  };

  const clearLexile = () => edit(book, { lexile_record_id: null });

  const setEditingLexileTrue = () => {
    setSelectedLexile(lexile_record);
    setEditingLexile(true);
  };
  const setEditingLexileFalse = () => {
    setEditingLexile(false);
    setSelectedLexile(null);
  };

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

  const setModify = () => modify(true);

  return (
    <Container first={props.first}>
      <ButtonColumn>
        {!selected ? (
          <StyledCheckbox
            color="#555555"
            size={3}
            tickSize={3}
            borderThickness={1}
            checked={checked}
            backAnimationDuration={50}
            tickAnimationDuration={300}
            onChange={changeCheck}
          />
        ) : null}
        <ButtonIcon onClick={setModify}>
          <Icon viewBox="0 0 20 20">
            <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z" />
          </Icon>
        </ButtonIcon>
      </ButtonColumn>
      <ImageContainer>
        <BookImg
          src={
            cover_url ||
            'http://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
          }
        />
      </ImageContainer>
      <DivideIntoRows>
        <Columns>
          <Details>
            <DetailLine>
              <BoldSpan>Title: </BoldSpan>
              <Italics>{title}</Italics>
            </DetailLine>
            <DetailLine>
              <ClickableSpan onClick={goToAuthor(author_full_name)}>
                <BoldSpan>Author: </BoldSpan>
                <span>{author_full_name}</span>
              </ClickableSpan>
            </DetailLine>
            <DetailLine>
              <BoldSpan>TEXT ID: </BoldSpan>
              <span>{text_id}</span>
            </DetailLine>
            {series ? (
              <DetailLine>
                <BoldSpan>Series Name: </BoldSpan>
                <span>{series}</span>
                <BoldSpanSpaced> Series Index: </BoldSpanSpaced>
                <span>{series_index}</span>
              </DetailLine>
            ) : null}
            <DetailLine>
              <BoldSpan> Duplicate: </BoldSpan>
              <span>{duplicate || ' - '}</span>
            </DetailLine>
            <DetailLine>
              <BoldSpan>Variety: </BoldSpan>
              <span>{text_variety || ' - '}</span>
            </DetailLine>
          </Details>
          <Buttons>
            <TrustedButton onClick={changeTrust} trusted={trusted}>
              {trusted ? 'Trusted' : 'Trust'}
            </TrustedButton>
            <HiddenButton onClick={toggleHideBook} hidden={hidden}>
              {hidden ? 'Hidden' : 'Visible'}
            </HiddenButton>
            {selected ? (
              <Button selected onClick={clearSelection}>
                Clear
              </Button>
            ) : (
              <Button onClick={setSelected}>Reference</Button>
            )}
            <Duplicates>
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
        </Columns>
        <DetailsLarger>
          <DetailLineOverflow>
            <BoldSpan>Lexile</BoldSpan>
            <AsyncCustomSelect
              editingLexile={editingLexile}
              showButtons={setEditingLexileTrue}
              defaultLexile={lexile_record}
              setSelected={setSelectedLexile}
              getOptions={searchLexile}
              book={book}
            />
            <EditLexileButtonIcon onClick={clearLexile}>
              <Icon viewBox="0 0 20 20">
                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
              </Icon>
            </EditLexileButtonIcon>
          </DetailLineOverflow>
          {editingLexile && (
            <LexileButtonsContainer>
              <Button onClick={editBookLexile}>Save</Button>
              <Button onClick={setEditingLexileFalse}>Cancel</Button>
            </LexileButtonsContainer>
          )}
        </DetailsLarger>
      </DivideIntoRows>
    </Container>
  );
}

BookListItem.propTypes = {};

export default withRouter(BookListItem);
