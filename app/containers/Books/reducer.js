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
  BATCH_HIDE,
  BATCH_SET_REFERENCE,
  SET_REFERENCE_FAILED,
  SET_REFERENCE_SUCCESS,
  BATCH_HIDE_FAILED,
  BATCH_HIDE_SUCCESS,
} from './constants';

export const initialState = {
  bookList: [],
  loading: false,
  error: false,
  baseBookSelected: {},
  duplicatedBooks: [],
  editedBooks: [],
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
        draft.duplicatedBooks = draft.duplicatedBooks.filter(
          book => book.gr_id !== action.book.gr_id,
        );
        break;
      case SET_DUPLICATE:
        console.log('duplicates: ', [action.book, ...draft.duplicatedBooks]);
        draft.duplicatedBooks = [action.book, ...draft.duplicatedBooks];
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
        break;
      case BATCH_HIDE:
        draft.editedBooks = [];
        console.log('hiding');
        draft.error = false;
        draft.loading = true;
        break;
      case BATCH_HIDE_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
      case BATCH_HIDE_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.duplicatedBooks = [];
        draft.bookList = draft.bookList.filter(
          bookToEvaluate =>
            action.booksChanged.findIndex(
              bookChanged => bookChanged.text_id === bookToEvaluate.text_id,
            ) < 0,
        );
        draft.loading = false;
        break;
      case BATCH_SET_REFERENCE:
        console.log('marking duplicates');
        draft.error = false;
        draft.loading = true;
        break;
      case SET_REFERENCE_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SET_REFERENCE_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.duplicatedBooks = [];
        draft.bookList = draft.bookList.filter(
          bookToEvaluate =>
            action.booksChanged.findIndex(
              bookChanged => bookChanged.text_id === bookToEvaluate.text_id,
            ) < 0,
        );
        draft.loading = false;
        break;
    }
  });

export default booksReducer;
