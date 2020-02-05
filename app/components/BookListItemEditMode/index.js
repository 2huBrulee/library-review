/**
 *
 * BookListItemEditMode
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import Select from 'components/Select';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 8px 0;
  padding: 8px 8px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: auto;
  align-items: center;
  ${({ first }) => !first && `border-top-width: thin;`}

  & > * {
    margin: 0 4px 15px;
  }
`;

const Buttons = styled.div`
  grid-column: 3/5;
  display: flex;
  justify-content: flex-end;
`;

const OddColumn = styled.div`
  grid-column: 1/3;
`;

const EvenColumn = styled.div`
  grid-column: 3/5;
`;

const SaveButton = styled(Button)`
  grid-column: 3;
  background-color: #2b9401;
  border: 1px solid #2b9401;
  color: white;
`;

const CancelButton = styled(Button)`
  grid-column: 4;
  background-color: #0082c8;
  border: 1px solid #0082c8;
  color: white;
  margin: 0 12px;
`;

const InputDiv = styled.div`
  justify-content: space-between;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  margin: 0 8px 0 0;
  padding: 0;
`;

/*
  title, img_url, duplicate, hidden, series, series_index, trusted, text_variety
*/

function BookListItemEditMode(props) {
  const { modify, book, saveChanges } = props;

  const [changes, setChanges] = useState({
    title: '',
    img_url: '',
    duplicate_id: '',
    hidden: false,
    series: '',
    series_index: '',
    trusted: false,
    text_variety: '',
  });

  const {
    title,
    img_url,
    duplicate,
    hidden,
    series,
    series_index,
    trusted,
    text_variety,
  } = book;

  useEffect(
    () =>
      setChanges({
        title,
        img_url,
        duplicate_id: duplicate.id,
        hidden,
        series,
        series_index,
        trusted,
        text_variety,
      }),
    [
      title,
      img_url,
      duplicate,
      hidden,
      series,
      series_index,
      trusted,
      text_variety,
    ],
  );

  const cancelEdition = () => modify(false);

  const save = () => {
    saveChanges(changes);
    cancelEdition();
  };

  const handleChange = e => {
    e.persist();
    if (e.target.name === 'series_index') {
      try {
        const newSI = parseInt(e.target.value, 10);
        if (newSI >= 0) {
          setChanges(prevValues => ({
            ...prevValues,
            [e.target.name]: newSI.toString(10),
          }));
        } else {
          setChanges(prevValues => ({
            ...prevValues,
            [e.target.name]: '',
          }));
        }
      } catch (ex) {
        setChanges(prevValues => ({
          ...prevValues,
          [e.target.name]: '',
        }));
      }
    } else {
      setChanges(prevValues => ({
        ...prevValues,
        ...(e.target.type === 'checkbox'
          ? { [e.target.name]: e.target.checked }
          : { [e.target.name]: e.target.value }),
      }));
    }
  };

  const handleTextVarietyChange = e => {
    setChanges(prevValues => ({
      ...prevValues,
      text_variety: e.target.value.value,
    }));
  };

  const textVarietyOptions = [
    { label: 'fiction', value: 'fiction' },
    { label: 'non-fiction', value: 'non-fiction' },
  ];

  const getTVOptionSelected = textVariety =>
    textVarietyOptions.reduce(
      (pv, cv) => (cv.value === textVariety ? cv : pv),
      {},
    );

  return (
    <Wrapper>
      <OddColumn>
        <InputDiv>
          <Label>Title</Label>
          <TextInput
            onChange={handleChange}
            name="title"
            value={changes.title}
          />
        </InputDiv>
      </OddColumn>
      <EvenColumn>
        <InputDiv>
          <Label>Text Variety</Label>
          <Select
            name="text_variety"
            value={getTVOptionSelected(changes.text_variety)}
            onChange={handleTextVarietyChange}
            options={textVarietyOptions}
            width="232px"
          />
        </InputDiv>
      </EvenColumn>
      <OddColumn>
        <InputDiv>
          <Label>Series</Label>
          <TextInput
            onChange={handleChange}
            name="series"
            value={changes.series}
          />
        </InputDiv>
      </OddColumn>
      <EvenColumn>
        <InputDiv>
          <Label>Duplicate</Label>
          <TextInput
            onChange={handleChange}
            name="duplicate_id"
            value={changes.duplicate_id}
          />
        </InputDiv>
      </EvenColumn>
      <OddColumn>
        <InputDiv>
          <Label>Series Index</Label>
          <TextInput
            onChange={handleChange}
            name="series_index"
            value={changes.series_index}
          />
        </InputDiv>
      </OddColumn>
      <EvenColumn>
        <InputDiv>
          <Label>Image URL</Label>
          <TextInput
            onChange={handleChange}
            name="img_url"
            value={changes.img_url}
          />
        </InputDiv>
      </EvenColumn>

      <OddColumn>
        <Checkbox
          onChange={handleChange}
          name="hidden"
          label="hidden"
          checked={changes.hidden}
        />
      </OddColumn>
      <EvenColumn>
        <Checkbox
          onChange={handleChange}
          name="trusted"
          label="trusted"
          checked={changes.trusted}
        />
      </EvenColumn>
      <Buttons>
        <SaveButton onClick={save}>Save</SaveButton>
        <CancelButton onClick={cancelEdition}>Cancel</CancelButton>
      </Buttons>
    </Wrapper>
  );
}

BookListItemEditMode.propTypes = {};

export default BookListItemEditMode;
