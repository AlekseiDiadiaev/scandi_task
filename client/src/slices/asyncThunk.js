import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, deleteProducts } from "../api/dataApi";

export const productsDataFetched = createAsyncThunk(
    'PRODUCTS_DATA_FETCHED', () => {
        return getProducts();
    })

export const productsDeleted = createAsyncThunk(
    'PRODUCTS_DELETED', async (payload, {dispatch}) => {
        await Promise.all(deleteProducts(payload));
        dispatch(productsDataFetched());
    })    

