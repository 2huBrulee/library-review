/*
 *
 * Books actions
 *
 */

import {
  LOAD_BOOKS_FOUND,
  LOAD_BOOKS_FOUND_SUCCESS,
  LOAD_BOOKS_FOUND_FAILED,
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
