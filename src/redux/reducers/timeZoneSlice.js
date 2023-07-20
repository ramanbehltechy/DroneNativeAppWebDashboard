import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loading: false,
    error: null,
    res : null
};

const timeZoneSlice = createSlice({
    name: 'timeZone',
    initialState,
    reducers: {
        timeZoneRequest: (state) => {
            state.loading = true;
        },
        timeZoneSuccess: (state, action) => {
            state.loading = false;
            state.res = action.payload;
        },
        timeZoneFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { timeZoneRequest, timeZoneSuccess, timeZoneFailure } = timeZoneSlice.actions;
export default timeZoneSlice.reducer;