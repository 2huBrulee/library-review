/**
 *
 * BookListItemEditMode
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 8px 0;
  padding: 8px 8px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  ${({ first }) => !first && `border-top-width: thin;`}
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  grid-auto-columns: 100%;
`;

const Label = styled.div`
  margin: 0 8px 0 0;
  padding: 0;
`;

/*
  title, img_url, cover_url, hidden, series, series_index, trusted, text_variety
*/

function BookListItemEditMode(props) {
  const { book } = props;

  const [changes, setChanges] = useState({
    title: book.title,
    img_url: book.img_url,
    cover_url: book.cover_url,
    hidden: book.hidden,
    series: book.series,
    series_index: book.series_index,
    trusted: book.trusted,
    text_variety: book.text_variety,
  });

  const handleChange = e => setChanges({ [e.target.name]: e.target.value });

  return (
    <Wrapper>
      <InputDiv>
        <Label>Title</Label>
        <TextInput name="title" value={changes.title} />
      </InputDiv>
      <InputDiv>
        <Label>Image URL</Label>
        <TextInput name="img_url" value={changes.img_url} />
      </InputDiv>
      <InputDiv>
        <Label>Cover URL</Label>
        <TextInput name="cover_url" value={changes.cover_url} />
      </InputDiv>
      <InputDiv>
        <Label>Series</Label>
        <TextInput name="series" value={changes.series} />
      </InputDiv>
      <InputDiv>
        <Label>Series Index</Label>
        <TextInput name="series_index" value={changes.series_index} />
      </InputDiv>
      <InputDiv>
        <Label>Text Variety</Label>
        <TextInput name="text_variety" value={changes.text_variety} />
      </InputDiv>
      <Checkbox label="hidden" value={changes.hidden} />
      <Checkbox label="trusted" value={changes.trusted} />
      <Button>Save</Button>
    </Wrapper>
  );
}

BookListItemEditMode.propTypes = {};

export default BookListItemEditMode;
