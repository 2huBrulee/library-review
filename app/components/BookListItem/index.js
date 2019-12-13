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
import Select from 'components/Select';
import Autocomplete from 'components/Autocomplete';

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
  min-width: 120px;
  margin: 4px 8px;
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
  margin: 4px 8px;
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
  margin: 4px 8px;
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
  color: #ff8000;
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
      if (
        !lexile_record ||
        selectedLexile.lexile_id !== lexile_record.lexile_id
      ) {
        edit(book, { lexile_record_ir: selectedLexile.lexile_id });
      }
    }
    setEditingLexileFalse();
  };

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
        <ButtonIcon onClick={setModify}>
          <Icon viewBox="0 0 20 20">
            <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z" />
          </Icon>
        </ButtonIcon>
      </ButtonColumn>
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
          <span>{text_variety || ' - '}</span>
          <BoldSpan> Duplicate: </BoldSpan>
          <span>{duplicate || ' - '}</span>
        </DetailLine>
        <DivisionLine />

        {!lexile_record && !editingLexile && (
          <Button onClick={setEditingLexileTrue}>Add Lexile Record</Button>
        )}
        {lexile_record && (
          <DetailLine>
            <BoldSpan>Lexile Record</BoldSpan>
            <EditLexileButtonIcon onClick={setEditingLexileTrue}>
              <Icon viewBox="0 0 20 20">
                <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z" />
              </Icon>
            </EditLexileButtonIcon>
          </DetailLine>
        )}
        {editingLexile && (
          <Autocomplete
            setSelected={setSelectedLexile}
            getOptions={searchLexile}
            baseSearch={title}
          />
        )}
        {editingLexile && (
          <DetailLine>
            <BoldSpan>Score: </BoldSpan>
            <span>{selectedLexile ? selectedLexile.lexile : '---'}</span>
            <BoldSpan> Author: </BoldSpan>
            <span>{selectedLexile ? selectedLexile.lexile_author : '---'}</span>
          </DetailLine>
        )}
        {editingLexile && (
          <DetailLine>
            <BoldSpan>Title: </BoldSpan>
            <span>{selectedLexile ? selectedLexile.title : '---'}</span>
          </DetailLine>
        )}
        {editingLexile && (
          <LexileButtonsContainer>
            <Button onClick={editBookLexile}>Save</Button>
            <Button onClick={setEditingLexileFalse}>Cancel</Button>
          </LexileButtonsContainer>
        )}

        {lexile_record && !editingLexile && (
          <DetailLine>
            <BoldSpan>Score: </BoldSpan>
            <span>{lexile_score}</span>
            <BoldSpan> Author: </BoldSpan>
            <span>{lexile_record.lexile_author}</span>
          </DetailLine>
        )}
        {lexile_record && !editingLexile && (
          <DetailLine>
            <BoldSpan>Title: </BoldSpan>
            <span>{lexile_record.title}</span>
          </DetailLine>
        )}
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
    </Container>
  );
}

BookListItem.propTypes = {};

export default withRouter(BookListItem);
