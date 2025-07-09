import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers } from "../service/firebase-api";

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};  

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}

export const loadTeachers = createAsyncThunk(
  "teachers/load",
  async ({ lastKey, limit }, { rejectWithValue }) => {
    try {
      const data = await fetchTeachers(lastKey, limit);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

 const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
        teachers: [],
        lastKey: null,
        isLoading: false,
        error: null,
        isEnd: false,
    },
    reducers: {
        clearTeachers: (state) => {
            state.teachers = [];
            state.lastKey = null;
            state.isEnd = false;
        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadTeachers.pending, handlePending)
        .addCase(loadTeachers.fulfilled, (state, action) => {
            console.log("loadTeachers.fulfilled", action.payload);
            

 const { teachers, lastKey, hasMore } = action.payload;

  const existingIds = new Set(state.teachers.map(t => t.id));
  const uniqueTeachers = teachers.filter(t => !existingIds.has(t.id));

  state.teachers.push(...uniqueTeachers);
  
  if (teachers.length > 0) {
    state.lastKey = lastKey;
  }

  state.isEnd = !hasMore;
  state.isLoading = false;
  state.error = null;
})
        .addCase(loadTeachers.rejected, handleRejected);

}})

export default teachersSlice.reducer;
export const { clearTeachers } = teachersSlice.actions;