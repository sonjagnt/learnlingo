import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "../../service/firebase-api";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const loadFavs = createAsyncThunk(
  "favorites/load",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const data = await fetchFavorites(userId);
      console.log(data);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavs.pending, handlePending)
      .addCase(loadFavs.fulfilled, (state, action) => {
        const existingIds = new Set(state.list.map((i) => i.id));
        const payloadItems = Array.isArray(action.payload)
          ? action.payload
          : [];
        const uniqueFavs = payloadItems.filter((i) => !existingIds.has(i.id));
        state.list.push(...uniqueFavs);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadFavs.rejected, handleRejected);
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.list.includes(action.payload)) state.list.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.list = state.list.filter((id) => id != action.payload);
    },
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
