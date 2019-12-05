/*
 *
 * SearchBarContainer actions
 *
 */

import {
  SET_SEARCH_TYPE,
  SET_SEARCH_CATEGORY,
  CHANGE_SEARCH_STRING,
  SET_SEARCH_ORIGIN,
  CHANGE_MORE_OPTIONS_VISIBILITY,
  CHANGE_HIDDEN_VISIBILITY,
  CHANGE_DUPLICATES_VISIBILITY,
  CHANGE_NUMBER_OF_RESULTS,
  SET_REDUX_INIT,
} from './constants';

export const setSearchCategory = searchCategory => ({
  type: SET_SEARCH_CATEGORY,
  searchCategory,
});

export const setSearchType = searchType => ({
  type: SET_SEARCH_TYPE,
  searchType,
});

export const setSearchOrigin = searchOrigin => ({
  type: SET_SEARCH_ORIGIN,
  searchOrigin,
});

export const changeSearchString = searchString => ({
  type: CHANGE_SEARCH_STRING,
  searchString,
});

export const changeHiddenVisibility = () => ({
  type: CHANGE_HIDDEN_VISIBILITY,
});

export const changeDuplicatesVisibility = () => ({
  type: CHANGE_DUPLICATES_VISIBILITY,
});

export const changeMoreOptionsVisibility = () => ({
  type: CHANGE_MORE_OPTIONS_VISIBILITY,
});

export const changeNumberOfResults = numberOfResults => ({
  type: CHANGE_NUMBER_OF_RESULTS,
  numberOfResults,
});

export const setReduxInit = () => ({
  type: SET_REDUX_INIT,
});
