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
  SET_REFERENCE_FAILED,
  SET_REFERENCE_SUCCESS,
  BATCH_HIDE_SUCCESS,
  BATCH_HIDE_FAILED,
  SET_TRUST_STATUS,
  SET_TRUST_SUCCESS,
  EDIT_BOOK,
  EDIT_SUCCESS,
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

export const batchHide = (booksToHide, hidden) => ({
  type: BATCH_HIDE,
  booksToHide,
  hidden,
});

export const batchHideSuccess = booksChanged => ({
  type: BATCH_HIDE_SUCCESS,
  booksChanged,
});

export const batchHideFailed = error => ({
  type: BATCH_HIDE_FAILED,
  error,
});

export const batchSetReference = (duplicates, referenceBook) => ({
  type: BATCH_SET_REFERENCE,
  duplicates,
  referenceBook,
});

export const setReferenceSucces = booksChanged => ({
  type: SET_REFERENCE_SUCCESS,
  booksChanged,
});

export const setReferenceFailed = error => ({
  type: SET_REFERENCE_FAILED,
  error,
});

export const setTrustStatus = (booksToTrust, trust) => ({
  type: SET_TRUST_STATUS,
  booksToTrust,
  trust,
});

export const setTrustSuccess = booksChanged => ({
  type: SET_TRUST_SUCCESS,
  booksChanged,
});

export const editBook = (book, changes) => ({
  type: EDIT_BOOK,
  book,
  changes,
});

export const editSuccess = booksChanged => ({
  type: EDIT_SUCCESS,
  booksChanged,
});
