import { takeLatest, call, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess } from '../reducers/authSlice';
import axios from 'axios';

function* loginUser(action) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_SERVER_API}auth/login`, action.payload);
    localStorage.setItem("item",JSON.stringify({token :  response.data.token,userData :  response.data.userData}));
    const decode = JSON.parse(atob(response.data.token.split('.')[1]));
    response.data.tokenData = decode;
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error?.response?.data || error));
  }
}

function* logoutUser() {
  localStorage.removeItem('item');
  yield put(logoutSuccess());
}

function* loginSaga() {
  yield takeLatest('user/loginRequest', loginUser);
  yield takeLatest('user/logoutRequest', logoutUser);
}

export default loginSaga;
