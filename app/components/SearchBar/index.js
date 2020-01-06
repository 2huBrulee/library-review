/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
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

const StyledCheckbox = styled(Checkbox)`
  background-color: green;
`;

const StyledTextInput = styled(TextInput)`
  transition: all 0.3s ease-in-out;
  outline: none;
  ${({ valid }) => !valid && `border-color: red;`};
  :focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

const StyledTextInputNumberOf = styled(TextInput)`
  flex: 0;
  min-width: 100px;
  max-width: 159px;
`;

const StyledButton = styled(Button)`
  background-color: #0082c8;
  color: white;
  border: 1px solid #0082c8;
`;

const StyledClickableText = styled(ClickableText)`
  min-width: 100px;
  color #0082c8;
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
  text-align: right;
  box-sizing: border-box;
  align-items: center;

  & > ${StyledCheckbox} {
    background-color: red;
    min-width: 10px;
    flex: 0 0;
  }

  & > * {
    ${margin};
    flex: 2 1;
    min-width: 150px;
  }
`;

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
    handleChangeNumberOfResults,
    search,
  } = props;

  const isQueryValid = searchString.length >= 1;

  return (
    <StyledSticky>
      <Wrapper {...props} margin={2}>
        <Select
          options={searchCategories}
          value={searchCategory}
          onChange={handleCategoryChange}
        />
        <StyledTextInput
          placeholder={
            searchCategory === 'BOOKS'
              ? 'Enter Book Title'
              : searchCategory === 'AUTHORS'
                ? "Enter Author's name"
                : '<<<< Select Search Type'
          }
          valid={isQueryValid}
          value={searchString}
          onChange={handleSearchQueryInput}
        />
        {searchCategory === 'BOOKS' ? (
          <Select
            options={searchTypes}
            value={searchType}
            onChange={handleTypeChange}
          />
        ) : (
          <Select
            options={origins}
            value={searchOrigin}
            onChange={handleOriginChange}
          />
        )}
        <StyledButton disabled={!isQueryValid} onClick={search}>
          Search
        </StyledButton>
        {showingMoreOptions && searchCategory === 'BOOKS' && (
          <Select
            options={origins}
            value={searchOrigin}
            onChange={handleOriginChange}
          />
        )}
        {showingMoreOptions && searchCategory === 'BOOKS' && (
          <StyledCheckbox
            onChange={handleShowDuplicatesClick}
            label="Duplicates"
            checked={duplicatesIncluded}
          />
        )}
        {showingMoreOptions && searchCategory === 'BOOKS' && (
          <Checkbox
            onChange={handleShowHiddenClick}
            label="Hidden"
            checked={hiddenIncluded}
          />
        )}
        {showingMoreOptions && (
          <StyledTextInputNumberOf
            onChange={handleChangeNumberOfResults}
            value={numberOfResults === -1 ? '' : numberOfResults}
            placeholder="# of results"
          />
        )}
        <StyledClickableText onClick={handleShowMoreOptionsClick}>
          {showingMoreOptions ? 'show less' : 'show more'}
        </StyledClickableText>
      </Wrapper>
    </StyledSticky>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
