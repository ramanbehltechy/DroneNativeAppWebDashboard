import { createSlice } from '@reduxjs/toolkit';

let initialState = {
   editingItem:null,
   load: false,
   error: null,
   response : null
};


const editShowSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {    
        setEditingItem: (state, action) => {
            state.editingItem= action.payload;
        },
       clearEditingItem:(state)=>{
        state.editingItem=null;
       }
        },
});
        const editSlice = createSlice({
            name: 'editShow',
            initialState,
            reducers: {
                editShowRequest: (state) => {
                    state.load = true;
                },
                editShowSuccess: (state, action) => {
                    state.load = false;
                    state.response = action.payload;
                },
                editShowFailure: (state, action) => {
                    state.load = false;
                    state.response = action.payload;
                }
    }
});





export const {setEditingItem,clearEditingItem } = editShowSlice.actions;
export const { editShowRequest, editShowSuccess, editShowFailure } = editSlice.actions;

export const editShowReducer = editShowSlice.reducer;
export const editReducer=editSlice.reducer;
