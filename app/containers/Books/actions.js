/*
 *
 * Books actions
 *
 */

import {
  LOAD_BOOKS_FOUND,
  LOAD_BOOKS_FOUND_SUCCESS,
  LOAD_BOOKS_FOUND_FAILED,
  SET_DUPLICATE,
  SET_SELECTED_BOOK,
  CLEAR_SELECTED,
  CLEAR_DUPLICATE,
  BATCH_HIDE,
  BATCH_SET_REFERENCE,
} from './constants';

export const loadBooksFound = bookQuery => ({
  type: LOAD_BOOKS_FOUND,
  bookQuery,
});

export const loadBooksFoundSuccess = bookList => ({
  type: LOAD_BOOKS_FOUND_SUCCESS,
  bookList,
});

export const loadBooksFoundFailed = error => ({
  type: LOAD_BOOKS_FOUND_FAILED,
  error,
});

export const setSelectedBook = book => ({
  type: SET_SELECTED_BOOK,
  book,
});

export const setDuplicate = book => ({
  type: SET_DUPLICATE,
  book,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const clearDuplicate = book => ({
  type: CLEAR_DUPLICATE,
  book,
});

export const batchHide = booksToHide => ({
  type: BATCH_HIDE,
  booksToHide,
});

export const batchSetReference = (duplicates, referenceBook) => ({
  type: BATCH_SET_REFERENCE,
  duplicates,
  referenceBook,
});
