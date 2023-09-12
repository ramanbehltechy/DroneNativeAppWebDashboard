import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  tokenData : null
};

const item = localStorage.getItem("item");
if (item) {
  let parseItem = JSON.parse(item);
  if (parseItem.token) {
    const decode = JSON.parse(atob(parseItem.token.split('.')[1]));
    initialState.tokenData = decode;
    if (decode.exp  > new Date().getTime() / 1000) {
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
      state.tokenData = action.payload.tokenData;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.res = action.payload;
      state.isLoggedIn = false;
      state.tokenData = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.res = null;
      state.userData = null;
      state.tokenData = null;
    }
  }
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
