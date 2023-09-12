import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    user: null,
    loading: false,
    error: null,
    editingItem: null

};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updatedUserProfileRequest: (state) => {
            state.loading = true;
        },
        updatedUserProfileSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        updatedUserProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

const getUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequest: (state) => {
            state.loading = true;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getUserFailure: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }
    }
});

const postUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        postUserRequest: (state) => {
            state.loading = true;
        },
        postUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        postUserFailure: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }
    }
});

const editUserslice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setEditingItem: (state, action) => {
            state.editingItem = action.payload;
        },
        clearEditingItem: (state) => {
            state.editingItem = null;
        }
    },
});

const editUser = createSlice({
    name: 'edituser',
    initialState,
    reducers: {
        editUserRequest: (state) => {
            state.loading = true;
        },
        editUserSuccess: (state, action) => {
            state.load = false;
            state.response = action.payload;
        },
        editUserFailure: (state, action) => {
            state.load = false;
            state.response = action.payload;
        }
    }
});

const deleteUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.load = false;
            state.response = action.payload;
        },
        deleteUserFailure: (state, action) => {
            state.load = false;
            state.response = action.payload;
        }
    }
});

export const { updatedUserProfileRequest, updatedUserProfileSuccess, updatedUserProfileFailure } = userSlice.actions;
export const { postUserRequest, postUserSuccess, postUserFailure } = postUserSlice.actions;
export const { getUserRequest, getUserSuccess, getUserFailure } = getUserSlice.actions;
export const { setEditingItem, clearEditingItem } = editUserslice.actions;
export const { editUserRequest, editUserSuccess, editUserFailure } = editUser.actions;
export const { deleteUserRequest, deleteUserSuccess, deleteUserFailure } = deleteUser.actions;
export const editUserReducer = editUserslice.reducer;
export const userReducer = userSlice.reducer;
export const getuserReducer = getUserSlice.reducer;
export const postuserReducer = postUserSlice.reducer;
export const editSliceUserReducer = editUser.reducer;
export const deleteUserReducer = deleteUser.reducer;

