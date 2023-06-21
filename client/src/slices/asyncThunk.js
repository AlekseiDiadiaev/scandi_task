import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getOneProduct, deleteProducts, checkUniqueSku, createProduct } from "../api/dataApi";

export const productsDataFetched = createAsyncThunk(
    'PRODUCTS_DATA_FETCHED', () => {
        return getProducts();
    })

export const oneProductFetched = createAsyncThunk(
    'ONE_PRODUCT_FETCHED', (payload) => {
        return getOneProduct(payload);
    })

export const isSkuUniqueFetched = createAsyncThunk(
    'IS_SKU_UNIQUE_FETCHED', (payload) => {
        return checkUniqueSku(payload);
    })

export const productsDeleted = createAsyncThunk(
    'PRODUCTS_DELETED', async (payload, { dispatch }) => {
        await Promise.all(deleteProducts(payload));
        dispatch(productsDataFetched());
    })

export const productCreated = createAsyncThunk(
    'PRODUCT_CREATED', async (payload) => {
        return createProduct(payload);
    })

