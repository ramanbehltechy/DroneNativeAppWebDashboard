import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loading: false,
    error: null,
    res : null,
    deleteDataRes : null
};


const getShowSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        getShowRequest: (state) => {
            state.loading = true;
        },
        getShowSuccess: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        },
        getShowFailure: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        }
    }
});


const postShowSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        postShowRequest: (state) => {
            state.loading = true;
        },
        postShowSuccess: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        },
        postShowFailure: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        }
    }
});

const deleteShowSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        deleteShowRequest: (state) => {
            state.loading = true;
        },
        deleteShowSuccess: (state, action) => {
            state.loading = false;
            state.deleteDataRes = action.payload;
        },
        deleteShowFailure: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        }
    }
});

export const { getShowRequest, getShowSuccess, getShowFailure } = getShowSlice.actions;
export const { postShowRequest, postShowSuccess, postShowFailure } = postShowSlice.actions;
export const { deleteShowRequest, deleteShowSuccess, deleteShowFailure } = deleteShowSlice.actions;
export const getShowReducer = getShowSlice.reducer;
export const postShowReducer = postShowSlice.reducer;
export const deleteShowReducer = deleteShowSlice.reducer;