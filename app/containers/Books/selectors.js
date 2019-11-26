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
    substate =>
      substate.bookList.filter(
        book => book.text_id !== substate.baseBookSelected.text_id,
      ),
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

const makeBaseBookSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.baseBookSelected,
  );

const makeDuplicatedBooksSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.duplicatedBooks,
  );

const makeEditedBooksSelector = () =>
  createSelector(
    selectBooksDomain,
    substate => substate.editedBooks,
  );

export default makeSelectBooks;
export {
  selectBooksDomain,
  makeBookListSelector,
  makeBookListLoaderSelector,
  makeBookListErrorSelector,
  makeBaseBookSelector,
  makeDuplicatedBooksSelector,
  makeEditedBooksSelector,
};
