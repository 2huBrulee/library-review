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

const StyledTextInput = styled(TextInput)``;

const StyledTextInputNumberOf = styled(TextInput)`
  flex: 1 0;
  min-width: 100px;
`;

const StyledButton = styled(Button)`
  flex: 1 1;
`;

const StyledClickableText = styled(ClickableText)`
  min-width: 100px;
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
          value={searchString}
          onChange={handleSearchQueryInput}
        />
        <Select
          options={searchTypes}
          value={searchType}
          onChange={handleTypeChange}
        />
        <StyledButton onClick={search}>Search</StyledButton>
        {showingMoreOptions && (
          <Select
            options={origins}
            value={searchOrigin}
            onChange={handleOriginChange}
          />
        )}
        {showingMoreOptions && (
          <Checkbox
            onChange={handleShowDuplicatesClick}
            label="duplicates"
            value={duplicatesIncluded}
          />
        )}
        {showingMoreOptions && (
          <Checkbox
            onChange={handleShowHiddenClick}
            label="hidden"
            value={hiddenIncluded}
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
          {showingMoreOptions ? 'show less...' : 'show more...'}
        </StyledClickableText>
      </Wrapper>
    </StyledSticky>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
