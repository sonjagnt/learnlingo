import { configureStore } from "@reduxjs/toolkit";
import  teachersReducer from './teachersSlice.js';

export const store = configureStore({
    reducer: {
        teachers: teachersReducer,
    }
})