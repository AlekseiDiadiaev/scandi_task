import { createSlice } from '@reduxjs/toolkit'
import { productsDataFetched, productsDeleted } from './asyncThunk'

export const Slice = createSlice({
    name: 'slice',
    initialState: {
        productsData: [],
        loading: false,
        error: false,
        seletedToDelete: []
    },
    reducers: {
        toDeleteSelected(state, action) {
            state.seletedToDelete.push(action.payload);
        },
        toDeleteCancel(state, action) {
            const index = state.seletedToDelete.findIndex(item => item === action.payload);
            state.seletedToDelete.splice(index, 1)
        },       
    },
    extraReducers: (builder) => {
        builder
            .addCase(productsDataFetched.fulfilled, (state, action) => {
                state.productsData = action.payload
                state.loading = false;
                state.error = false;
            })
            .addCase(productsDataFetched.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(productsDataFetched.rejected, state => {
                state.error = true;
                state.loading = false;
            })
            .addCase(productsDeleted.fulfilled, (state) => {
                    state.seletedToDelete = []
            })
            .addDefaultCase(() => {})
    },
})

export default Slice.reducer

export const {
    toDeleteSelected,
    toDeleteCancel
} = Slice.actions;