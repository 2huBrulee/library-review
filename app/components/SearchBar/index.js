/**
 *
 * SearchBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import Select from '../Select';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import ClickableText from '../ClickableText';

const StyledTextInput = styled(TextInput)``;
const StyledButton = styled(Button)`
  flex: 1 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
  ${space};
  & > ${StyledTextInput} {
    flex: 1 0;
  }
  & > * {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const options = [
  {
    value: 1,
    label: 'First Option',
  },
];

function SearchBar(props) {
  return (
    <Wrapper {...props}>
      <Select options={options} mr={2} ml={2} />
      <StyledTextInput placeholder="Enter some text..." mr={2} ml={2} />
      <Select options={options} mr={2} ml={2} />
      <StyledButton mr={2} ml={2}>
        Search
      </StyledButton>

      <Select options={options} mr={2} ml={2} />
      <Checkbox label="Checkbox1" ml={2} mr={2} />
      <Checkbox label="Checkbox2" ml={2} mr={2} />
      <ClickableText ml={2} mr={2}>
        show less...
      </ClickableText>
    </Wrapper>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
