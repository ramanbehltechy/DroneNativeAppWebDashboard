import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { deleteShowReducer, getShowReducer , postShowReducer } from './reducers/showSlice';
import timeZoneReducer from './reducers/timeZoneSlice';
import { editReducer, editShowReducer } from './reducers/editSlice';
import { userReducer , postuserReducer , getuserReducer , editUserReducer , editSliceUserReducer ,deleteUserReducer} from './reducers/userSlice';
import { passwordReducer } from './reducers/passwordSlice';
import { forgetPasswordReducer, resetPasswordReducer } from './reducers/forgotPasswordSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  getShow: getShowReducer,
  postShow : postShowReducer,
  deleteShow : deleteShowReducer,
  timeZone : timeZoneReducer,
  edit:editShowReducer,
  editShow:editReducer,
  user:userReducer,
  postuserReducer,
  getuserReducer,
  editUserReducer,
  editSliceUserReducer,
  deleteUserReducer,
  password:passwordReducer,
  forgetPassword:forgetPasswordReducer,
  resetPassword:resetPasswordReducer
});

export default rootReducer;