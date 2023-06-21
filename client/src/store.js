import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/slice';

const store = configureStore({
    reducer,
    middleware: defaultMiddleware => defaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;