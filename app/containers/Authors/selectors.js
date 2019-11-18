import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authors state domain
 */

const selectAuthorsDomain = state => state.authors || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Authors
 */

const makeSelectAuthors = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate,
  );

const makeAuthorListSelector = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate.authorList,
  );

const makeAuthorListLoaderSelector = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate.loading,
  );

const makeAuthorListErrorSelector = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate.error,
  );

export default makeSelectAuthors;
export {
  selectAuthorsDomain,
  makeAuthorListSelector,
  makeAuthorListLoaderSelector,
  makeAuthorListErrorSelector,
};
