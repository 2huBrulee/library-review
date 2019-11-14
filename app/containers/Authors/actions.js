/*
 *
 * Authors actions
 *
 */

import {
  LOAD_AUTHORS_FOUND,
  LOAD_AUTHORS_FOUND_FAILED,
  LOAD_AUTHORS_FOUND_SUCCESS,
} from './constants';

export const loadAuthorsFound = authorQuery => ({
  type: LOAD_AUTHORS_FOUND,
  authorQuery,
});

export const loadAuthorsFoundSuccess = authorList => ({
  type: LOAD_AUTHORS_FOUND_SUCCESS,
  authorList,
});

export const loadAuthorsFoundFailed = error => ({
  type: LOAD_AUTHORS_FOUND_FAILED,
  error,
});
