/*
 *
 * SearchBarContainer reducer
 *
 */
import produce from 'immer';
import {
  SET_SEARCH_TYPE,
  SET_SEARCH_CATEGORY,
  CHANGE_SEARCH_STRING,
  SET_SEARCH_ORIGIN,
  CHANGE_MORE_OPTIONS_VISIBILITY,
  CHANGE_HIDDEN_VISIBILITY,
  CHANGE_DUPLICATES_VISIBILITY,
  CHANGE_NUMBER_OF_RESULTS,
} from './constants';

export const initialState = {
  searchCategory: 'BOOK',
  searchString: '',
  searchType: 'REGULAR',
  searchOrigin: 'ALL',
  hiddenIncluded: false,
  duplicatesIncluded: false,
  showingMoreOptions: false,
  numberOfResults: -1,
};

/* eslint-disable default-case, no-param-reassign */
const searchBarContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEARCH_CATEGORY:
        draft.searchCategory = action.searchCategory;
        break;
      case SET_SEARCH_TYPE:
        draft.searchType = action.searchType;
        break;
      case SET_SEARCH_ORIGIN:
        draft.searchOrigin = action.searchOrigin;
        break;
      case CHANGE_SEARCH_STRING:
        draft.searchString = action.searchString;
        break;
      case CHANGE_HIDDEN_VISIBILITY:
        draft.hiddenIncluded = !state.hiddenIncluded;
        break;
      case CHANGE_DUPLICATES_VISIBILITY:
        draft.duplicatesIncluded = !state.duplicatesIncluded;
        break;
      case CHANGE_MORE_OPTIONS_VISIBILITY:
        draft.showingMoreOptions = !state.showingMoreOptions;
        break;
      case CHANGE_NUMBER_OF_RESULTS:
        draft.numberOfResults = action.numberOfResults;
        break;
    }
  });

export default searchBarContainerReducer;
