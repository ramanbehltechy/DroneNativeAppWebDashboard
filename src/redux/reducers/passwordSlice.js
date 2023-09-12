import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loading: false,
    response : null,
    error: null,
   
};


const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        updatePasswordRequest: (state) => {
            state.loading = true;

        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.response=action.payload;
            state.error=null;
        },
        updatePasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});




export const { updatePasswordRequest, updatePasswordSuccess, updatePasswordFailure } = passwordSlice.actions;


export const passwordReducer = passwordSlice.reducer;
