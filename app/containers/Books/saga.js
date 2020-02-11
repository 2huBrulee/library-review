import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { questionRequests } from './requests';
import {
  loadBooksFoundSuccess,
  loadBooksFoundFailed,
  setReferenceFailed,
  setReferenceSucces,
  batchHideSuccess,
  batchHideFailed,
  setTrustSuccess,
  editSuccess,
  createQuestionSuccess,
  createQuestionFailure,
  editQuestionSuccess,
  editQuestionFailure,
} from './actions';
import {
  LOAD_BOOKS_FOUND,
  BATCH_HIDE,
  BATCH_SET_REFERENCE,
  SET_TRUST_STATUS,
  EDIT_BOOK,
  CREATE_QUESTION,
  EDIT_QUESTION,
} from './constants';

const getBooks = bookQuery =>
  axios.get(`https://matilda.whooosreading.org/api/v1/search`, {
    params: {
      ...bookQuery,
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
    auth: {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    },
  });

const getBookById = id =>
  axios.get(`https://matilda.whooosreading.org/api/v1/books/text_id/${id}`, {
    params: {
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
    auth: {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    },
  });

const hideBooks = (booksToHide, hidden) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToHide.length > 1 ? 'books' : 'book']: {
        hidden,
        ...(hidden ? { trusted: false } : null),
      },
      embed:
        'author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned,book.duplicate,book.lexile_record,book.questions',
      force_display_cover: true,
    },
    {
      params: {
        keys: booksToHide.reduce(
          (booksString, bookToHide) =>
            booksString === '' ? bookToHide.text_id : `${booksString},${bookToHide.text_id}`,
          '',
        ),
      },
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
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
    {
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      },
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
              booksString === '' ? bookToEdit.text_id : `${booksString},${bookToEdit.text_id}`,
            '',
          );
          return xd;
        })(),
      },
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      },
    },
  );

const setReferenceBook = (booksToReference, referenceBook) =>
  axios.patch(
    `https://matilda.whooosreading.org/api/v1/books/text_id`,
    {
      [booksToReference.length > 1 ? 'books' : 'book']: {
        duplicate_id: referenceBook.text_id,
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
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      },
    },
  );

export function* getBookSearchResults(action) {
  try {
    const originRegEx = /(^AUT.+)|(^BASE.+)|(^LEXILE.+)|(^MANU.+)/g;
    if (originRegEx.test(action.bookQuery.q)) {
      const { data } = yield call(getBookById, action.bookQuery.q);
      yield put(loadBooksFoundSuccess(data.results ? data.results : [data.book]));
    } else {
      const { data } = yield call(getBooks, action.bookQuery);
      yield put(loadBooksFoundSuccess(data.results ? data.results : [data.book]));
    }
  } catch (e) {
    yield put(loadBooksFoundFailed(e));
  }
}

export function* getBatchBookTrust(action) {
  try {
    const { data } = yield call(setTrustStatus, action.booksToTrust, action.trust);
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
    const { data } = yield call(setReferenceBook, action.duplicates, action.referenceBook);
    yield put(setReferenceSucces(data.results ? data.results : [data.book]));
  } catch (e) {
    yield put(setReferenceFailed(e));
  }
}

export function* getCreateQuestion(action) {
  console.log(action);
  try {
    const { data } = yield call(questionRequests.createQuestion, action.book, action.question);
    yield put(createQuestionSuccess(action.book, data.question));
  } catch (e) {
    yield put(createQuestionFailure(e));
  }
}

export function* getEditQuestion(action) {
  console.log(action);
  try {
    const { data } = yield call(questionRequests.editQuestion, action.question);
    yield put(editQuestionSuccess(action.book, data.question));
  } catch (e) {
    yield put(editQuestionFailure(e));
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

export function* createQuestionSaga() {
  yield takeLatest(CREATE_QUESTION, getCreateQuestion);
}

export function* editQuestionSaga() {
  console.log('yield');
  yield takeLatest(EDIT_QUESTION, getEditQuestion);
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
    createQuestionSaga(),
    editQuestionSaga(),
  ]);
}
