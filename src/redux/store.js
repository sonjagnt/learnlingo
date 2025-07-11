import { configureStore } from "@reduxjs/toolkit";
import  teachersReducer from './teachers/slice.js';
import favoritesReducer from './favorites/slice.js';

export const store = configureStore({
    reducer: {
        teachers: teachersReducer,
        favorites: favoritesReducer,
    }
})