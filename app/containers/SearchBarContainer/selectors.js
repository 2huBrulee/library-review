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

const searchCategorySelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.searchCategory,
  );

const searchStringSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.searchString,
  );

const searchTypeSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.searchType,
  );

const searchOriginSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.searchOrigin,
  );

const hiddenIncludedSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.hiddenIncluded,
  );

const duplicatesIncludedSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.duplicatesIncluded,
  );

const showingMoreOptionsSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.showingMoreOptions,
  );

const numberOfResultsSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.numberOfResults,
  );

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
  searchCategorySelector,
  searchStringSelector,
  searchTypeSelector,
  searchOriginSelector,
  hiddenIncludedSelector,
  duplicatesIncludedSelector,
  showingMoreOptionsSelector,
  numberOfResultsSelector,
};
