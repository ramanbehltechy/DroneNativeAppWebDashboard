import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};

const item = localStorage.getItem("item");
if (item) {
  let parseItem = JSON.parse(item);
  if (parseItem.token) {
    const decode = JSON.parse(atob(parseItem.token.split('.')[1]));
    if (decode.exp * 1000 > new Date().getTime()) {
      initialState.isLoggedIn = true
      initialState.userData = parseItem.userData
    }
  }
}

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.res = action.payload;
      state.userData = action.payload.userData;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.res = action.payload;
      state.isLoggedIn = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.res = null;
      state.userData = null;
    }
  }
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
