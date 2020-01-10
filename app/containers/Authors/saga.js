import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loadAuthorsFoundSuccess } from './actions';
import { LOAD_AUTHORS_FOUND } from './constants';

const getAuthorkByKey = key =>
  axios.get(`https://matilda.whooosreading.org/api/v1/authors`, {
    params: {
      key,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate',
    },
    auth: {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    },
  });

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
    auth: {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    },
  });

export function* getAuthorSearchResults(action) {
  console.log(action);
  try {
    const originRegEx = /(^AUT.+)|(^BASE.+)|(^LEXILE.+)|(^MANU.+)/g;
    if (originRegEx.test(action.authorQuery.full_name)) {
      const { data } = yield call(
        getAuthorkByKey,
        action.authorQuery.full_name,
      );
      yield put(
        loadAuthorsFoundSuccess(data.authors ? data.authors : [data.book]),
      );
    } else {
      console.log('here');
      const { data } = yield call(getAuthors, action.authorQuery);
      yield put(
        loadAuthorsFoundSuccess(data.authors ? data.authors : [data.author]),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

// Individual exports for testing
export default function* authorsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_AUTHORS_FOUND, getAuthorSearchResults);
}
