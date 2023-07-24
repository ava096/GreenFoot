import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import treeService from "../trees/treeService";

const initialState = {
  tree: [],
  selectedLocation: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Find closest trees
export const findTrees = createAsyncThunk(
  "tree/find",
  async (location, thunkAPI) => {
    try {
      console.log(location);
      const token = thunkAPI.getState().auth.user.token;
      return await treeService.findTreeLongLat(
        token,
        location.lng,
        location.lat
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setLocation: (state, action) => {
      console.log("setLocation payload:", action.payload);
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findTrees.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(findTrees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tree = action.payload;
      })
      .addCase(findTrees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setLocation } = treeSlice.actions;
export default treeSlice.reducer;