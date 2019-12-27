import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadBooksFoundSuccess,
  loadBooksFoundFailed,
  setReferenceFailed,
  setReferenceSucces,
  batchHideSuccess,
  batchHideFailed,
  setTrustSuccess,
  editSuccess,
} from './actions';
import {
  LOAD_BOOKS_FOUND,
  BATCH_HIDE,
  BATCH_SET_REFERENCE,
  SET_TRUST_STATUS,
  EDIT_BOOK,
} from './constants';

const getBooks = bookQuery =>
  axios.get(`https://matilda.whooosreading.org/api/v1/search`, {
    params: {
      ...bookQuery,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
  });

const getBookById = id =>
  axios.get(`https://matilda.whooosreading.org/api/v1/books/text_id/${id}`, {
    params: {
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
  });

const hideBooks = (booksToHide, hidden) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToHide.length > 1 ? 'books' : 'book']: {
        hidden,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
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

const editBook = (book, newData) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id/${book.text_id}`,
    {
      book: newData,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
  );

const setTrustStatus = (booksToEdit, trust) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToEdit.length > 1 ? 'books' : 'book']: {
        trusted: trust,
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
    {
      params: {
        keys: (() => {
          const xd = booksToEdit.reduce(
            (booksString, bookToEdit) =>
              booksString === ''
                ? bookToEdit.text_id
                : `${booksString},${bookToEdit.text_id}`,
            '',
          );
          console.log(xd);
          return xd;
        })(),
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
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
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
    const originRegEx = /(^AUT.+)|(^BASE.+)|(^LEXILE.+)|(^MANU.+)/g;
    if (originRegEx.test(action.bookQuery.q)) {
      const { data } = yield call(getBookById, action.bookQuery.q);
      yield put(
        loadBooksFoundSuccess(data.results ? data.results : [data.book]),
      );
    } else {
      const { data } = yield call(getBooks, action.bookQuery);
      yield put(
        loadBooksFoundSuccess(data.results ? data.results : [data.book]),
      );
    }
  } catch (e) {
    yield put(loadBooksFoundFailed(e));
  }
}

export function* getBatchBookTrust(action) {
  try {
    const { data } = yield call(
      setTrustStatus,
      action.booksToTrust,
      action.trust,
    );
    yield put(setTrustSuccess(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(setReferenceFailed(e));
  }
}

export function* getEditBook(action) {
  try {
    const { data } = yield call(editBook, action.book, action.changes);
    yield put(editSuccess(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(setReferenceFailed(e));
  }
}

export function* getBatchBookHide(action) {
  try {
    const { data } = yield call(hideBooks, action.booksToHide, action.hidden);
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

export function* bookTrustSaga() {
  yield takeLatest(SET_TRUST_STATUS, getBatchBookTrust);
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

export function* editBookSaga() {
  yield takeLatest(EDIT_BOOK, getEditBook);
}

// Individual exports for testing
export default function* booksSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    loadBooksSaga(),
    hideBooksSaga(),
    referenceBooksSaga(),
    bookTrustSaga(),
    editBookSaga(),
  ]);
}
