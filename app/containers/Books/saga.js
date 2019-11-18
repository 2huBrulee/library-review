import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loadBooksFoundSuccess, loadBooksFoundFailed } from './actions';
import { LOAD_BOOKS_FOUND } from './constants';

const getBooks = bookQuery =>
  axios.get(`https://matilda.whooosreading.org/api/v1/search`, {
    params: {
      q: bookQuery,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
  });

export function* getBookSearchResults(action) {
  try {
    const { data } = yield call(getBooks, action.bookQuery);
    yield put(loadBooksFoundSuccess(data.results));
  } catch (e) {
    yield put(loadBooksFoundFailed(e));
  }
}

// Individual exports for testing
export default function* booksSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_BOOKS_FOUND, getBookSearchResults);
}
