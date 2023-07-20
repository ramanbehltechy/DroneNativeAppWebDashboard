import { all } from 'redux-saga/effects';
import loginSaga  from './sagas/authSaga';
import showSaga from './sagas/showSaga';
import timeZoneSaga from './sagas/timeZoneSage';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    showSaga(),
    timeZoneSaga(),
  ]);
}
