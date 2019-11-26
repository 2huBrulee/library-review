import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadBooksFoundSuccess,
  loadBooksFoundFailed,
  setReferenceFailed,
  setReferenceSucces,
  batchHideSuccess,
  batchHideFailed,
} from './actions';
import { LOAD_BOOKS_FOUND, BATCH_HIDE, BATCH_SET_REFERENCE } from './constants';

const getBooks = bookQuery =>
  axios.get(`https://matilda.whooosreading.org/api/v1/search`, {
    params: {
      q: bookQuery,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
  });

const hideBooks = booksToHide =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToHide.length > 1 ? 'books' : 'book']: {
        hidden: true,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
    {
      params: {
        keys: booksToHide.reduce(
          (booksString, bookToHide) =>
            booksString === ''
              ? bookToHide.text_id
              : `${booksString},${bookToHide.text_id}`,
          '',
        ),
      },
    },
  );

const setReferenceBook = (booksToReference, referenceBook) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToReference.length > 1 ? 'books' : 'book']: {
        duplicate: referenceBook.text_id,
        hidden: true,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
    {
      params: {
        keys: booksToReference.reduce(
          (booksString, bookToReference) =>
            booksString === ''
              ? bookToReference.text_id
              : `${booksString},${bookToReference.text_id}`,
          '',
        ),
      },
    },
  );

export function* getBookSearchResults(action) {
  try {
    const { data } = yield call(getBooks, action.bookQuery);
    yield put(loadBooksFoundSuccess(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(loadBooksFoundFailed(e));
  }
}

export function* getBatchBookHide(action) {
  try {
    const { data } = yield call(hideBooks, action.booksToHide);
    yield put(batchHideSuccess(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(batchHideFailed(e));
  }
}

export function* getBatchBookReference(action) {
  try {
    const { data } = yield call(
      setReferenceBook,
      action.duplicates,
      action.referenceBook,
    );
    yield put(setReferenceSucces(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(setReferenceFailed(e));
  }
}

export function* loadBooksSaga() {
  yield takeLatest(LOAD_BOOKS_FOUND, getBookSearchResults);
}

export function* hideBooksSaga() {
  yield takeLatest(BATCH_HIDE, getBatchBookHide);
}

export function* referenceBooksSaga() {
  yield takeLatest(BATCH_SET_REFERENCE, getBatchBookReference);
}

// Individual exports for testing
export default function* booksSaga() {
  // See example in containers/HomePage/saga.js
  yield all([loadBooksSaga(), hideBooksSaga(), referenceBooksSaga()]);
}
