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

const SearchTypes = [
  {
    label: 'search 1',
    value: 1,
  },
  {
    label: 'search 2',
    value: 2,
  },
];

const textPlaceholder = 'Placeholder text ...';

const Origins = [
  {
    label: 'origin 1',
    value: 1,
  },
  {
    label: 'origin2',
    value: 2,
  },
];

const Checkbox1 = {
  label: 'checkbox1',
  value: 1,
};
const Checkbox2 = {
  label: 'checkbox2',
  value: 2,
};

const SearchBar = props => {
  const {
    searchCategory,
    searchString,
    searchType,
    searchOrigin,
    hiddenIncluded,
    duplicatesIncluded,
    showingMoreOptions,
    numberOfResults,
    searchCategories,
    origins,
    searchTypes,
    handleCategoryChange,
    handleOriginChange,
    handleTypeChange,
    handleSearchQueryInput,
    handleShowMoreOptionsClick,
    handleShowDuplicatesClick,
    handleShowHiddenClick,
  } = props;

  console.log(showingMoreOptions);

  return (
    <StyledSticky>
      <Wrapper {...props} margin={2}>
        <Select options={searchTypes} />
        <StyledTextInput placeholder="placeholder" />
        <Select options={origins} />
        <StyledButton>Search</StyledButton>
        {showingMoreOptions && <Select options={searchCategory} />}
        {showingMoreOptions && (
          <Checkbox onChange={handleShowDuplicatesClick} {...Checkbox1} />
        )}
        {showingMoreOptions && (
          <Checkbox onChange={handleShowHiddenClick} {...Checkbox2} />
        )}
        <ClickableText onClick={handleShowMoreOptionsClick}>
          show less...
        </ClickableText>
      </Wrapper>
    </StyledSticky>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
