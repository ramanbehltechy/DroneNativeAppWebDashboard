import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { deleteUserFailure, deleteUserSuccess, editUserFailure, editUserSuccess, getUserFailure, getUserSuccess, postUserFailure, postUserSuccess, updatedUserProfileFailure, updatedUserProfileSuccess } from '../reducers/userSlice';

function updateProfileApi(userData,token){
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`${token}`,
        }
    };
    return axios.put(`${process.env.REACT_APP_SERVER_API}editProfile`,userData,config)
}

function* updateProfileData(action) { 
  try {
    const {name,email}=action?.payload;
    const getToken=JSON.parse(localStorage.getItem('item'));
    const token=getToken?.token;
    const response = yield call(updateProfileApi,{name,email},token);
    localStorage.setItem("item",JSON.stringify({token,userData :  response.data.user}));
    yield put(updatedUserProfileSuccess(response.data));
    
  } catch (error) {
    yield put(updatedUserProfileFailure(error?.response?.data || error));
  }
}

function* getUserData(action) {
  const {page,limit}=action.payload;
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.get, `${process.env.REACT_APP_SERVER_API}user/list?page=${page}&limit=${limit}`, {headers:headerParams});

    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error?.response?.data || error));
  }
}

function* postUserData(action) {
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.post, `${process.env.REACT_APP_SERVER_API}user/add`, action.payload, {headers:headerParams});
    yield put(postUserSuccess(response.data));
  } catch (error) {
    yield put(postUserFailure(error?.response?.data || error));
  }
}

function* updateUserData(action) {
  const {id,formData}=action.payload;
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.put, `${process.env.REACT_APP_SERVER_API}user/update/${id}`, formData, {headers:headerParams});
    yield put(editUserSuccess(response.data));
  } catch (error) {
    yield put(editUserFailure(error?.response?.data || error));
  }
}

function* deleteUserData(action) {
  const {id}=action.payload;
  try {
    const headerParams = {
      'Content-Type':'application/json',
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.delete, `${process.env.REACT_APP_SERVER_API}user/delete-user/${id}`, {headers:headerParams});
    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserFailure(error?.response?.data || error));
  }
}

function* editProfileSaga() {
  yield takeLatest('user/updatedUserProfileRequest', updateProfileData);
  yield takeLatest('user/getUserRequest', getUserData);
  yield takeLatest('user/postUserRequest', postUserData);
  yield takeLatest('edituser/editUserRequest', updateUserData);
  yield takeLatest('user/deleteUserRequest', deleteUserData);
}

export default editProfileSaga;
