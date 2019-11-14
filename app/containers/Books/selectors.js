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

export default makeSelectBooks;
export { selectBooksDomain, makeBookListSelector };
