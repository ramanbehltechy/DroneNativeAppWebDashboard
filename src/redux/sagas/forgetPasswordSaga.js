import { takeLatest, call, put } from 'redux-saga/effects';
import { forgotPasswordSuccess,forgotPasswordFailure, resetPasswordFailure, resetPasswordSuccess } from '../reducers/forgotPasswordSlice';
import axios from 'axios';

function* forgetPassword(action) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_SERVER_API}api/forget-password`, action.payload);
    yield put(forgotPasswordSuccess(response.data));
  } catch (error) {
    yield put(forgotPasswordFailure(error?.response?.data || error));
  }
}

function* resetPassword(action) {
    try {
      const response = yield call(axios.put, `${process.env.REACT_APP_SERVER_API}api/reset-password`, action.payload);
      yield put(resetPasswordSuccess(response.data));
    } catch (error) {
      yield put(resetPasswordFailure(error?.response?.data || error));
    }
  }


function* forgetPasswordSaga() {
  yield takeLatest('forgetpassword/forgotPasswordRequest', forgetPassword);
   yield takeLatest('resetpassword/resetPasswordRequest', resetPassword);
}

export default forgetPasswordSaga;