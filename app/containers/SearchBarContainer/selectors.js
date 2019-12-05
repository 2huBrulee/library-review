import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchBarContainer state domain
 * urlSearch: state.router.location.search
 */

const selectSearchBarContainerDomain = state =>
  state.searchBarContainer || initialState;

const selectRouterLocation = state => state.router.location || { search: '' };

/**
 * Other specific selectors
 */

const searchSelector = () =>
  createSelector(
    selectRouterLocation,
    substate => substate.search,
  );

const pathSelector = () =>
  createSelector(
    selectRouterLocation,
    substate => substate.pathname,
  );

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

const reduxInitSelector = () =>
  createSelector(
    selectSearchBarContainerDomain,
    substate => substate.reduxInit,
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
  searchSelector,
  pathSelector,
  reduxInitSelector,
};
