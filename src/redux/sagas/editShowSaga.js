import { takeLatest, call, put } from 'redux-saga/effects';
import { editShowSuccess,editShowFailure } from '../reducers/editSlice';
import axios from 'axios';


function* editShowData(action) {
   
  try {
    const {id,formData}=action.payload;
    const headerParams = {
      "Authorization": JSON.parse(localStorage.getItem("item"))?.token
    };
    const response = yield call(axios.put, `${process.env.REACT_APP_SERVER_API}api/edit-show/${id}`,formData , {headers:headerParams});
    yield put(editShowSuccess(response.data));
  } catch (error) {
    yield put(editShowFailure(error?.response?.data || error));
  }
}


function* editShowSaga() {
  yield takeLatest('editShow/editShowRequest', editShowData);

}

export default editShowSaga;
