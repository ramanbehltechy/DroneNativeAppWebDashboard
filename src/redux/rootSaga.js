import { all } from 'redux-saga/effects';
import loginSaga  from './sagas/authSaga';
import showSaga from './sagas/showSaga';
import timeZoneSaga from './sagas/timeZoneSage';
import editShowSaga from './sagas/editShowSaga';
import userSaga from './sagas/userSaga';
import updatePasswordSaga from './sagas/passwordSaga';
import forgetPasswordSaga from './sagas/forgetPasswordSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    showSaga(),
    timeZoneSaga(),
    editShowSaga(),
    userSaga(),
    updatePasswordSaga(),
    forgetPasswordSaga(),

  ]);
}
