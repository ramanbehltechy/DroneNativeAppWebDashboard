import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  response : null
};

const forgetPasswordSlice = createSlice({
  name: 'forgetpassword',
  initialState,
  reducers: {
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      
    },
    forgotPasswordSuccess: (state,action) => {
      state.loading = false;
      state.response = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
  },
});
const resetPasswordSlice = createSlice({
    name: 'resetpassword',
    initialState,
    reducers: {
      resetPasswordRequest: (state) => {
        state.loading = true;
        state.error = null;
        
      },
      resetPasswordSuccess: (state,action) => {
        state.loading = false;
        state.response = action.payload;
      },
      resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
     
    },
  });

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = forgetPasswordSlice.actions;
export const {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
  } = resetPasswordSlice.actions;

export const forgetPasswordReducer= forgetPasswordSlice.reducer;
 export const resetPasswordReducer= resetPasswordSlice.reducer;