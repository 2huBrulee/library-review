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
  SET_TRUST_STATUS,
  SET_TRUST_SUCCESS,
  EDIT_BOOK,
  EDIT_SUCCESS,
  CREATE_QUESTION,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILURE,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  CHANGE_QUESTION_TO_BE_CREATED,
  SELECT_ALL_BOOKS,
} from './constants';

export const initialState = {
  bookList: [],
  loading: false,
  error: false,
  baseBookSelected: {},
  duplicatedBooks: [],
  editedBooks: [],
  questionToBeCreated: null,
  questionCreationError: false,
  questionEditError: false,
};

/* eslint-disable default-case, no-param-reassign */
const booksReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BOOKS_FOUND:
        console.log('searching books', action);
        draft.duplicatedBooks = [];
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_BOOKS_FOUND_SUCCESS:
        console.log('book search success', action);
        draft.duplicatedBooks = [];
        draft.loading = false;
        draft.error = false;
        draft.bookList = action.bookList;
        break;
      case LOAD_BOOKS_FOUND_FAILED:
        console.log('book search failed', action);
        draft.duplicatedBooks = [];
        draft.loading = false;
        draft.error = action.error;
        break;
      case SET_SELECTED_BOOK:
        console.log('selecting ', action.book);
        draft.baseBookSelected = action.book;
        draft.duplicatedBooks = state.duplicatedBooks.filter(
          book => book.text_id !== action.book.text_id,
        );
        break;
      case SET_DUPLICATE:
        console.log('duplicates: ', [action.book, ...state.duplicatedBooks]);
        draft.duplicatedBooks = [action.book, ...state.duplicatedBooks];
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
            book => book.text_id !== action.book.text_id,
          ),
        );
        draft.duplicatedBooks = state.duplicatedBooks.filter(
          book => book.text_id !== action.book.text_id,
        );
        break;
      case BATCH_HIDE:
        draft.editedBooks = [];
        console.log('hiding');
        draft.error = false;
        break;
      case BATCH_HIDE_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
      case BATCH_HIDE_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.duplicatedBooks = [];
        draft.bookList = state.bookList.filter(
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
        break;
      case SET_REFERENCE_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SET_REFERENCE_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.duplicatedBooks = [];
        draft.bookList = state.bookList.filter(
          bookToEvaluate =>
            action.booksChanged.findIndex(
              bookChanged => bookChanged.text_id === bookToEvaluate.text_id,
            ) < 0,
        );
        draft.loading = false;
        break;
      case SET_TRUST_STATUS:
        draft.editedBooks = [];
        draft.error = false;
        break;
      case SET_TRUST_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.bookList = state.bookList.map(bookToEvaluate =>
          action.booksChanged.reduce(
            (bookToReturn, bookChanged) =>
              bookChanged.text_id === bookToEvaluate.text_ &&
                bookToReturn.text_id === bookToEvaluate.text_id
                ? bookChanged
                : bookToReturn,
            bookToEvaluate,
          ),
        );
        draft.duplicatedBooks = [];
        draft.loading = false;
        break;
      case EDIT_BOOK:
        break;
      case EDIT_SUCCESS:
        draft.editedBooks = action.booksChanged;
        draft.bookList = state.bookList.map(bookToEvaluate =>
          action.booksChanged.reduce(
            (bookToReturn, bookChanged) =>
              bookChanged.text_id === bookToaluate.text_id &&
                bookToReturn.text_id === bookToEvaluate.text_id
                ? bookChanged
                : bookToReturn,
            bookToEvaluate,
          ),
        );
        draft.duplicatedBooks = [];
        draft.loading = false;
        break;
      case CREATE_QUESTION:
        break;
      case CREATE_QUESTION_SUCCESS:
        console.log(action);
        draft.questionToBeCreated = null;
        draft.bookList = state.bookList.map(bookToEvaluate => {
          bookToEvaluate.text_id === action.book.text_id &&
            bookToEvaluate.questions.push(action.questionCreated);
          return bookToEvaluate;
        });
        break;
      case CREATE_QUESTION_FAILURE:
        draft.questionCreationError = action.error;
        break;
      case EDIT_QUESTION:
        break;
      case EDIT_QUESTION_SUCCESS:
        draft.questionToBeCreated = null;
        draft.bookList = state.bookList.map(bookToEvaluate => {
          bookToEvaluate.text_id === action.book.text_id &&
            bookToEvaluate.questions.map(questionToEvaluate =>
              questionToEvaluate.key === action.questionChanged.key
                ? action.questionChanged
                : questionToEvaluate,
            );
          return bookToEvaluate;
        });
        break;
      case EDIT_QUESTION_FAILURE:
        draft.questionEditError = action.error;
        break;
      case CHANGE_QUESTION_TO_BE_CREATED:
        draft.questionToBeCreated = action.question;
        break;
      case SELECT_ALL_BOOKS:
        draft.duplicatedBooks = state.bookList.filter(
          book => book.text_id !== state.baseBookSelected.text_id,
        );
        break;
    }
  });

export default booksReducer;
