/*
 *
 * Authors reducer
 *
 */
import produce from 'immer';
import {
  LOAD_AUTHORS_FOUND,
  LOAD_AUTHORS_FOUND_FAILED,
  LOAD_AUTHORS_FOUND_SUCCESS,
} from './constants';

export const initialState = {
  authorList: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const booksReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_AUTHORS_FOUND:
        console.log('searching authors', action);
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_AUTHORS_FOUND_SUCCESS:
        console.log('author search success', action);
        draft.loading = false;
        draft.error = false;
        draft.authorList = action.authorList;
        break;
      case LOAD_AUTHORS_FOUND_FAILED:
        console.log('author search failed', action);
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default booksReducer;
