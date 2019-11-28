/**
 *
 * SearchBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { margin } from 'styled-system';
import Sticky from 'react-sticky-el';
import Select from '../Select';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import ClickableText from '../ClickableText';

const StyledTextInput = styled(TextInput)``;
const StyledButton = styled(Button)`
  flex: 1 0;
`;

const StyledSticky = styled(Sticky)`
  background-color: #fafafa;
  &.sticky {
    z-index: 99999;
    box-shadow: 0 4px 2px -2px lightgray !important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
  & > ${StyledTextInput} {
    flex: 1 0;
  }
  & > * {
    ${margin};
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
    <StyledSticky>
      <Wrapper {...props} margin={2}>
        <Select options={options} />
        <StyledTextInput placeholder="Enter some text..." />
        <Select options={options} />
        <StyledButton>Search</StyledButton>
        <Select options={options} />
        <Checkbox label="Checkbox1" />
        <Checkbox label="Checkbox2" />
        <ClickableText>show less...</ClickableText>
      </Wrapper>
    </StyledSticky>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
