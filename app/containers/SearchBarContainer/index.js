/**
 *
 * SearchBarContainer
 *
 */

import React, { useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
import { SEARCH_CATEGORIES, SEARCH_TYPES, ORIGINS, BOOKS, TRUSTED, GR, REGULAR } from './constants';
import makeSelectSearchBarContainer, {
  searchCategorySelector,
  searchStringSelector,
  searchTypeSelector,
  searchOriginSelector,
  hiddenIncludedSelector,
  duplicatesIncludedSelector,
  showingMoreOptionsSelector,
  numberOfResultsSelector,
  searchSelector,
  pathSelector,
  reduxInitSelector,
  referencedBookSelector,
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
    urlSearch,
    pathname,
    reduxInit,
    referencedBook,
  } = props;

  const params = qs.parse(urlSearch, { ignoreQueryPrefix: true });

  const getOriginObject = origin =>
    ORIGINS.reduce((pv, cv) => (origin === cv.value ? cv : pv), {
      label: 'ALL',
      value: 'ALL',
    });

  useDeepCompareEffect(() => {
    if (reduxInit) {
      dispatchSetSearchCategory(
        pathname === '/authors'
          ? {
              label: 'Search Authors',
              value: 'AUTHORS',
            }
          : {
              label: 'Search Books',
              value: 'BOOKS',
            },
      );
      dispatchChangeSearchString(params.q || params.full_name || '');
      if (params.origin) dispatchSetSearchOrigin(getOriginObject(params.origin));
      else
        dispatchSetSearchOrigin({
          label: 'All',
          value: 'ALL',
        });
      if (params.trusted)
        dispatchSetSearchType({
          label: 'Trusted',
          value: 'TRUSTED',
        });
      else if (params.gr)
        dispatchSetSearchType({
          label: 'GR',
          value: 'GR',
        });
      else
        dispatchSetSearchType({
          label: 'Regular',
          value: 'REGULAR',
        });
      if (params.hidden) dispatchChangeHiddenVisibility(params.hidden);
      if (params.duplicate) dispatchChangeDuplicatesVisibility(params.duplicate);
      if (params.num_results) {
        let nResults;
        try {
          nResults = parseInt(params.num_results, 10);
        } catch (e) {
          nResults = -1;
        }
        dispatchChangeNumberOfResults(nResults > 0 ? nResults : -1);
      }
    }
  }, [reduxInit, params]);

  useInjectReducer({ key: 'searchBarContainer', reducer });
  useInjectSaga({ key: 'searchBarContainer', saga });

  const search = () => {
    if (searchCategory.value === BOOKS) {
      const queryObject = {
        q: searchString,
        ...(searchOrigin.value !== 'ALL' ? { origin: searchOrigin.value } : null),
        ...(searchType.value === TRUSTED ? { trusted: true } : null),
        ...(searchType.value === GR ? { gr: true } : null),
        ...(hiddenIncluded ? { hidden: true } : null),
        ...(duplicatesIncluded ? { duplicate: true } : null),
        ...(numberOfResults > 0 ? { num_results: numberOfResults } : null),
      };
      const searchQuery = `?${qs.stringify(queryObject)}`;
      dispatchNewRoute({
        pathname: '/books',
        search: searchQuery,
      });
    } else {
      const queryObject = {
        full_name: searchString,
        ...(searchOrigin.value !== 'ALL' ? { origin: searchOrigin.value } : null),
        ...(numberOfResults > 0 ? { num_results: numberOfResults } : null),
      };
      const searchQuery = `?${qs.stringify(queryObject)}`;
      dispatchNewRoute({
        pathname: '/authors',
        search: searchQuery,
      });
    }
  };

  const handleOriginChange = e => dispatchSetSearchOrigin(e.target.value);

  const handleCategoryChange = e => dispatchSetSearchCategory(e.target.value);

  const handleTypeChange = e => dispatchSetSearchType(e.target.value);

  const handleSearchQueryInput = e => dispatchChangeSearchString(e.target.value);

  const handleShowMoreOptionsClick = () => dispatchChangeMoreOptionsVisibility();

  const handleShowDuplicatesClick = () => dispatchChangeDuplicatesVisibility();

  const handleShowHiddenClick = () => {
    dispatchChangeHiddenVisibility();
  };

  const handleChangeNumberOfResults = e => {
    let nResults;
    try {
      nResults = parseInt(e.target.value, 10);
    } catch (ex) {
      nResults = -1;
    }
    dispatchChangeNumberOfResults(nResults > 0 ? nResults : -1);
  };

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
      referencedBook={referencedBook}
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
  dispatchNewRoute: PropTypes.func.isRequired,
  searchCategory: PropTypes.object,
  searchString: PropTypes.string,
  searchType: PropTypes.object,
  searchOrigin: PropTypes.object,
  hiddenIncluded: PropTypes.bool,
  duplicatesIncluded: PropTypes.bool,
  showingMoreOptions: PropTypes.bool,
  numberOfResults: PropTypes.number,
  referencedBook: PropTypes.object,
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
  urlSearch: searchSelector(),
  reduxInit: reduxInitSelector(),
  pathname: pathSelector(),
  referencedBook: referencedBookSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetSearchCategory: searchCategory => dispatch(setSearchCategory(searchCategory)),
    dispatchSetSearchType: searchType => dispatch(setSearchType(searchType)),
    dispatchSetSearchOrigin: searchOrigin => dispatch(setSearchOrigin(searchOrigin)),
    dispatchChangeSearchString: searchString => dispatch(changeSearchString(searchString)),
    dispatchChangeHiddenVisibility: () => dispatch(changeHiddenVisibility()),
    dispatchChangeDuplicatesVisibility: () => dispatch(changeDuplicatesVisibility()),
    dispatchChangeMoreOptionsVisibility: () => dispatch(changeMoreOptionsVisibility()),
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
