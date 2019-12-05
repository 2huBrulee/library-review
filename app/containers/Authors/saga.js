import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loadAuthorsFoundSuccess } from './actions';
import { LOAD_AUTHORS_FOUND } from './constants';

const getAuthors = authorQuery =>
  axios.get(`https://matilda.whooosreading.org/api/v1/authors`, {
    params: {
      full_name: authorQuery.full_name,
      ...(authorQuery.num_results
        ? { num_results: authorQuery.num_results }
        : null),
      ...(authorQuery.origin ? { origin: authorQuery.origin } : null),
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
  });

export function* getAuthorSearchResults(action) {
  try {
    console.log(action.authorQuery);
    const { data } = yield call(getAuthors, action.authorQuery);
    yield put(loadAuthorsFoundSuccess(data.authors));
  } catch (e) {
    console.log(e);
  }
}

// Individual exports for testing
export default function* authorsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_AUTHORS_FOUND, getAuthorSearchResults);
}
