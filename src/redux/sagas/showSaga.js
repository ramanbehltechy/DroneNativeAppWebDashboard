import { takeLatest, call, put } from 'redux-saga/effects';
import { getShowSuccess, getShowFailure } from '../reducers/showSlice';
import { postShowSuccess, postShowFailure , deleteShowSuccess , deleteShowFailure} from '../reducers/showSlice';
import axios from 'axios';






function* getShowData(action) {
   const {page,limit}=action.payload;
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };    
     const response = yield call(axios.get,`${process.env.REACT_APP_SERVER_API}api/show?page=${page}&limit=${limit}` , {headers:headerParams});
    yield put(getShowSuccess(response.data));
  } catch (error) {
    yield put(getShowFailure(error?.response?.data || error));
  }
}

function* postShowData(action) {
  try {
    const headerParams = {
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.post, `${process.env.REACT_APP_SERVER_API}api/show`, action.payload, {headers:headerParams});
    yield put(postShowSuccess(response.data));
  } catch (error) {
    yield put(postShowFailure(error?.response?.data || error));
  }
}

function* deleteShowData(action) {
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };   
    const {id}=action.payload;
    const response = yield call(axios.delete, `${process.env.REACT_APP_SERVER_API}api/delete-show/${id}`,{headers:headerParams});
    yield put(deleteShowSuccess(response.data));
  } catch (error) {
    yield put(deleteShowFailure(error?.response?.data || error));
  }
}

function* showSaga() {
  yield takeLatest('show/getShowRequest', getShowData);
  yield takeLatest('show/postShowRequest', postShowData);
  yield takeLatest('show/deleteShowRequest', deleteShowData);
}

export default showSaga;
