import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { getShowReducer , postShowReducer } from './reducers/showSlice';
import timeZoneReducer from './reducers/timeZoneSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  getShow: getShowReducer,
  postShow : postShowReducer,
  timeZone : timeZoneReducer,
});

export default rootReducer;