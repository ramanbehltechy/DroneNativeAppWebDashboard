import { takeLatest, call, put } from 'redux-saga/effects';
import { getShowSuccess, getShowFailure } from '../reducers/showSlice';
import { postShowSuccess, postShowFailure } from '../reducers/showSlice';
import axios from 'axios';

function* getShowData() {
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_SERVER_API}api/show`);
    yield put(getShowSuccess(response.data));
  } catch (error) {
    yield put(getShowFailure(error?.response?.data || error));
  }
}

function* postShowData(action) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_SERVER_API}api/show`, action.payload);
    yield put(postShowSuccess(response.data));
  } catch (error) {
    yield put(postShowFailure(error?.response?.data || error));
  }
}

function* showSaga() {
  yield takeLatest('show/getShowRequest', getShowData);
  yield takeLatest('show/postShowRequest', postShowData);
}

export default showSaga;
