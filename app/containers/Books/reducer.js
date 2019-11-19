/*
 *
 * Books reducer
 *
 */
import produce from 'immer';
import {
  LOAD_BOOKS_FOUND,
  LOAD_BOOKS_FOUND_FAILED,
  LOAD_BOOKS_FOUND_SUCCESS,
  SET_SELECTED_BOOK,
  SET_DUPLICATE,
  CLEAR_SELECTED,
  CLEAR_DUPLICATE,
} from './constants';

export const initialState = {
  bookList: [],
  loading: false,
  error: false,
  baseBookSelected: {},
  duplicatedBooks: [],
};

/* eslint-disable default-case, no-param-reassign */
const booksReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BOOKS_FOUND:
        console.log('searching books', action);
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_BOOKS_FOUND_SUCCESS:
        console.log('book search success', action);
        draft.loading = false;
        draft.error = false;
        draft.bookList = action.bookList;
        break;
      case LOAD_BOOKS_FOUND_FAILED:
        console.log('book search failed', action);
        draft.loading = false;
        draft.error = action.error;
        break;
      case SET_SELECTED_BOOK:
        console.log('selecting ', action.book);
        draft.baseBookSelected = action.book;
        break;
      case SET_DUPLICATE:
        console.log('duplicates: ', [action.book, ...draft.duplicatedBooks]);
        draft.duplicatedBooks = [action.book, ...draft.duplicatedBooks];
        draft.bookList = draft.bookList.filter(
          book => book.gr_id !== action.book.gr_id,
        );
        break;
      case CLEAR_SELECTED:
        console.log('clearing selection');
        draft.duplicatedBooks = [];
        draft.baseBookSelected = {};
        break;
      case CLEAR_DUPLICATE:
        console.log(
          'duplicates',
          draft.duplicatedBooks.filter(
            book => book.gr_id !== action.book.gr_id,
          ),
        );
        draft.duplicatedBooks = draft.duplicatedBooks.filter(
          book => book.gr_id !== action.book.gr_id,
        );
        draft.bookList = [action.book, ...draft.bookList];
        break;
    }
  });

export default booksReducer;
