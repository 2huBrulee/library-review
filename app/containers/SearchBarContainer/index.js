/**
 *
 * SearchBarContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SearchBar from 'components/SearchBar';
import { SEARCH_CATEGORIES, SEARCH_TYPES, ORIGINS, BOOKS } from './constants';
import makeSelectSearchBarContainer, {
  searchCategorySelector,
  searchStringSelector,
  searchTypeSelector,
  searchOriginSelector,
  hiddenIncludedSelector,
  duplicatesIncludedSelector,
  showingMoreOptionsSelector,
  numberOfResultsSelector,
} from './selectors';

import {
  setSearchCategory,
  setSearchType,
  setSearchOrigin,
  changeSearchString,
  changeHiddenVisibility,
  changeDuplicatesVisibility,
  changeMoreOptionsVisibility,
  changeNumberOfResults,
} from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function SearchBarContainer(props) {
  const {
    dispatchSetSearchCategory,
    dispatchSetSearchType,
    dispatchSetSearchOrigin,
    dispatchChangeSearchString,
    dispatchChangeHiddenVisibility,
    dispatchChangeDuplicatesVisibility,
    dispatchChangeMoreOptionsVisibility,
    dispatchChangeNumberOfResults,
    dispatchNewRoute,
    searchCategory,
    searchString,
    searchType,
    searchOrigin,
    hiddenIncluded,
    duplicatesIncluded,
    showingMoreOptions,
    numberOfResults,
  } = props;

  useInjectReducer({ key: 'searchBarContainer', reducer });
  useInjectSaga({ key: 'searchBarContainer', saga });

  const search = () => {
    if (searchCategory === BOOKS) {
      const nameParams = encodeURI(searchString);
      let searchQuery = `?name=${nameParams}`;
      if (searchOrigin !== 'ALL') searchQuery += `&origin=${searchOrigin}`;
      dispatchNewRoute({
        pathname: '/books',
        search: searchQuery,
      });
    }
  };

  const handleOriginChange = e => dispatchSetSearchOrigin(e.target.value);

  const handleCategoryChange = e => dispatchSetSearchCategory(e.target.value);

  const handleTypeChange = e => dispatchSetSearchType(e.target.value);

  const handleSearchQueryInput = e =>
    dispatchChangeSearchString(e.target.value);

  const handleShowMoreOptionsClick = () =>
    dispatchChangeMoreOptionsVisibility();

  const handleShowDuplicatesClick = () => dispatchChangeDuplicatesVisibility();

  const handleShowHiddenClick = () => dispatchChangeHiddenVisibility();

  const handleChangeNumberOfResults = e =>
    dispatchChangeNumberOfResults(e.target.value);

  return (
    <SearchBar
      searchCategory={searchCategory}
      searchString={searchString}
      searchType={searchType}
      searchOrigin={searchOrigin}
      hiddenIncluded={hiddenIncluded}
      duplicatesIncluded={duplicatesIncluded}
      showingMoreOptions={showingMoreOptions}
      numberOfResults={numberOfResults}
      searchCategories={SEARCH_CATEGORIES}
      origins={ORIGINS}
      searchTypes={SEARCH_TYPES}
      handleCategoryChange={handleCategoryChange}
      handleOriginChange={handleOriginChange}
      handleTypeChange={handleTypeChange}
      handleSearchQueryInput={handleSearchQueryInput}
      handleShowMoreOptionsClick={handleShowMoreOptionsClick}
      handleShowDuplicatesClick={handleShowDuplicatesClick}
      handleShowHiddenClick={handleShowHiddenClick}
      handleChangeNumberOfResults={handleChangeNumberOfResults}
      search={search}
    />
  );
}

SearchBarContainer.propTypes = {
  dispatchSetSearchCategory: PropTypes.func.isRequired,
  dispatchSetSearchType: PropTypes.func.isRequired,
  dispatchSetSearchOrigin: PropTypes.func.isRequired,
  dispatchChangeSearchString: PropTypes.func.isRequired,
  dispatchChangeHiddenVisibility: PropTypes.func.isRequired,
  dispatchChangeDuplicatesVisibility: PropTypes.func.isRequired,
  dispatchChangeMoreOptionsVisibility: PropTypes.func.isRequired,
  dispatchChangeNumberOfResults: PropTypes.func.isRequired,
  searchCategory: PropTypes.string,
  searchString: PropTypes.string,
  searchType: PropTypes.string,
  searchOrigin: PropTypes.string,
  hiddenIncluded: PropTypes.bool,
  duplicatesIncluded: PropTypes.bool,
  showingMoreOptions: PropTypes.bool,
  numberOfResults: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  searchBarContainer: makeSelectSearchBarContainer(),
  searchCategory: searchCategorySelector(),
  searchString: searchStringSelector(),
  searchType: searchTypeSelector(),
  searchOrigin: searchOriginSelector(),
  hiddenIncluded: hiddenIncludedSelector(),
  duplicatesIncluded: duplicatesIncludedSelector(),
  showingMoreOptions: showingMoreOptionsSelector(),
  numberOfResults: numberOfResultsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetSearchCategory: searchCategory =>
      dispatch(setSearchCategory(searchCategory)),
    dispatchSetSearchType: searchType => dispatch(setSearchType(searchType)),
    dispatchSetSearchOrigin: searchOrigin =>
      dispatch(setSearchOrigin(searchOrigin)),
    dispatchChangeSearchString: searchString =>
      dispatch(changeSearchString(searchString)),
    dispatchChangeHiddenVisibility: () => dispatch(changeHiddenVisibility()),
    dispatchChangeDuplicatesVisibility: () =>
      dispatch(changeDuplicatesVisibility()),
    dispatchChangeMoreOptionsVisibility: () =>
      dispatch(changeMoreOptionsVisibility()),
    dispatchChangeNumberOfResults: numberOfResults =>
      dispatch(changeNumberOfResults(numberOfResults)),
    dispatchNewRoute: newLocation => dispatch(push(newLocation)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SearchBarContainer);
