import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../api/dataApi";

export const productsDataFetched = createAsyncThunk(
    'PRODUCTS_DATA_FETCHED', () => {
        return getProducts();
    })

