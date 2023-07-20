import { takeLatest, call, put } from 'redux-saga/effects';
import { timeZoneSuccess, timeZoneFailure  } from '../reducers/timeZoneSlice';
import axios from 'axios';

function* getTimeZone(action) {
  try {
    const response = yield call(axios.get, `https://maps.googleapis.com/maps/api/timezone/json?location=${Number(action.payload.latitude)},${Number(action.payload.longitude)}&timestamp=${Date.now() / 1000}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`);
    yield put(timeZoneSuccess(response));
  } catch (error) {
    yield put(timeZoneFailure(error));
  }
}


function* timeZoneSaga() {
  yield takeLatest('timeZone/timeZoneRequest', getTimeZone);
}

export default timeZoneSaga;