import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadBooksFoundSuccess,
  loadBooksFoundFailed,
  batchHide,
  batchSetReference,
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

const hideBook = book =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id/${book.text_id}`,
    {
      book: {
        hidden: true,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
  );

const hideBooks = booksToHide => booksToHide.map(book => hideBook(book));

const setReferenceBook = (book, referenceBook) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id/${book.text_id}`,
    {
      book: {
        duplicate: referenceBook.text_id,
        hidden: true,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned',
    },
  );

export function* getBookSearchResults(action) {
  try {
    const { data } = yield call(getBooks, action.bookQuery);
    yield put(loadBooksFoundSuccess(data.results));
  } catch (e) {
    yield put(loadBooksFoundFailed(e));
  }
}

export function* getBatchBookHide(action) {
  try {
    const { data } = yield call(hideBooks, action.booksToHide);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// Individual exports for testing
export default function* booksSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_BOOKS_FOUND, getBookSearchResults);
  yield takeLatest(BATCH_HIDE, getBatchBookHide);
}
