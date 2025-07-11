import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
    name: "filters",
    initialState: {
        languages: "",
        levels: "",
        price: null,
    },
    reducers: {
        setLanguages: (state, action) => {
            state.languages = action.payload ?? "";
        },
        setLevels: (state, action) => {
            state.levels = action.payload ?? "";
        },
        setPrice: (state, action) => {
            state.price = action.payload ?? null;
        },
        resetFilters: (state) => {
            state.languages = "";
            state.levels = "";
            state.price = null;
        }
        
    },

});


export const { setLanguages, setLevels, setPrice, resetFilters } = filters.actions;
export default filters.reducer;