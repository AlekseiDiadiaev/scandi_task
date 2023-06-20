import { createSlice } from '@reduxjs/toolkit'
import { productsDataFetched, productsDeleted, oneProductFetched, isSkuUniqueFetched, productCreated } from './asyncThunk'

export const Slice = createSlice({
    name: 'slice',
    initialState: {
        productsData: [],
        loading: false,
        error: false,
        seletedToDelete: [],
        skuIsUnique: true,
        loadingCheckSku: false,
        errorCheckSku: false,
    },
    reducers: {
        toDeleteSelected(state, action) {
            state.seletedToDelete.push(action.payload);
        },
        toDeleteCancel(state, action) {
            const index = state.seletedToDelete.findIndex(item => item === action.payload);
            state.seletedToDelete.splice(index, 1)
        },
        skuIsUniqueSet(state, action) {
            state.skuIsUnique = action.payload;
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
                state.loading = false;
                state.error = false;
            })
            .addCase(productsDeleted.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(productsDeleted.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })

            .addCase(isSkuUniqueFetched.fulfilled, (state, action) => {
                if(action.payload['is_unique']){
                    state.skuIsUnique = true;
                } else {
                    state.skuIsUnique = false;
                }
                state.loadingCheckSku = false;
                state.errorCheckSku = false;
            })
            .addCase(isSkuUniqueFetched.pending, state => {
                state.loadingCheckSku = true;
                state.errorCheckSku = false;
            })
            .addCase(isSkuUniqueFetched.rejected, (state, action) => {
                state.errorCheckSku = true;
                state.loadingCheckSku = false;
            })

            .addCase(productCreated.fulfilled, state => {
                state.loading = false;
                state.error = false;
            })
            .addCase(productCreated.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(productCreated.rejected, state => {
                state.error = true;
                state.loading = false;
            })

            .addDefaultCase(() => { })
    },
})

export default Slice.reducer

export const {
    toDeleteSelected,
    toDeleteCancel,
    skuIsUniqueSet
} = Slice.actions;