import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the books state domain
 */

const selectBooksDomain = state => state.books || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Books
 */

const makeSelectBooks = () =>
  createSelector(
    selectBooksDomain,
    substate => substate,
  );

const makeBookListSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.bookList,
  );

const makeBookListLoaderSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.loading,
  );

const makeBookListErrorSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.error,
  );

export default makeSelectBooks;
export {
  selectBooksDomain,
  makeBookListSelector,
  makeBookListLoaderSelector,
  makeBookListErrorSelector,
};
