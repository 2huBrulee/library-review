import { all, put, fork } from 'redux-saga/effects';
import { setReduxInit } from './actions';

function* initialSaga() {
  yield put(setReduxInit());
}
function* root() {
  yield fork(initialSaga);
}

// Individual exports for testing
export default function* searchBarContainerSaga() {
  // See example in containers/HomePage/saga.js
  yield all([root()]);
}
