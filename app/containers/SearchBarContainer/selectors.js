import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchBarContainer state domain
 */

const selectSearchBarContainerDomain = state =>
  state.searchBarContainer || initialState;

/**
 * Other specific selectors
 */

const testGlobalState = state => state;

const searchCategorySelector = state =>
  state.searchBarContainer
    ? state.searchBarContainer.searchCategory
    : initialState.searchCategory;
const searchStringSelector = state =>
  state.searchBarContainer.searchString || initialState.searchString;
const searchTypeSelector = state =>
  state.searchBarContainer.searchType || initialState.searchType;
const searchOriginSelector = state =>
  state.searchBarContainer.searchOrigin || initialState.searchOrigin;
const hiddenIncludedSelector = state =>
  state.searchBarContainer.hiddenIncluded || initialState.hiddenIncluded;
const duplicatesIncludedSelector = state =>
  state.searchBarContainer.duplicatesIncluded ||
  initialState.duplicatesIncluded;
const showingMoreOptionsSelector = state =>
  state.searchBarContainer.showingMoreOptions ||
  initialState.showingMoreOptions;
const numberOfResultsSelector = state =>
  state.searchBarContainer.numberOfResults || initialState.numberOfResults;

/**
 * Default selector used by SearchBarContainer
 */

const makeSelectSearchBarContainer = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate,
  );

export default makeSelectSearchBarContainer;
export {
  selectSearchBarContainerDomain,
  testGlobalState,
  searchCategorySelector,
  searchStringSelector,
  searchTypeSelector,
  searchOriginSelector,
  hiddenIncludedSelector,
  duplicatesIncludedSelector,
  showingMoreOptionsSelector,
  numberOfResultsSelector,
};
