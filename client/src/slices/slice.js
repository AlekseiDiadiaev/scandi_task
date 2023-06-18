import { createSlice } from '@reduxjs/toolkit'
import { productsDataFetched } from './asyncThunk'

export const Slice = createSlice({
    name: 'slice',
    initialState: {
        productsData: [],
        loading: false,
        error: false,
        jopa: 1
    },
    reducers: {
        // loadingChanged(state, action) {
        //     state.loading = action.payload;
        // },
        
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
            .addDefaultCase(() => {})
    },
})

export default Slice.reducer

export const {
} = Slice.actions;