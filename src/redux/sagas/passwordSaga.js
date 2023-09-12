import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { updatePasswordFailure, updatePasswordSuccess } from '../reducers/passwordSlice';

function updatePasswordApi(userData,token){
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`${token}`,
        }
    };
    return axios.put(`${process.env.REACT_APP_SERVER_API}update-password`,userData,config)
}

function* updatePasswordData(action) { 
  try {
    const {newPassword,confirmPassword}=action.payload;
    const getToken=JSON.parse(localStorage.getItem('item'));
    const token=getToken.token;
    const response = yield call(updatePasswordApi,{newPassword,confirmPassword},token);
    yield put(updatePasswordSuccess(response.data));
  } catch (error) {
    yield put(updatePasswordFailure(error?.response?.data || error));
  }
}


function* updatePasswordSaga() {
  yield takeLatest('password/updatePasswordRequest', updatePasswordData);
}

export default updatePasswordSaga;
