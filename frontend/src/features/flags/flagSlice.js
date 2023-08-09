import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import flagService from "../flags/flagService";

const initialState = {
  flag: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new flag
export const createFlag = createAsyncThunk(
  "flag/create",
  async ({ id, flagData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(id);
      console.log(flagData);
      console.log(token);
      return await flagService.createFlag(id, flagData, token);
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

// Get flagged reports
export const getFlaggedReports = createAsyncThunk(
  "flag/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await flagService.getFlaggedReports(token);
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

// Update flag status
export const updateFlagStatus = createAsyncThunk(
  "flag/updateStatus",
  async ({ id, flagData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await flagService.updateFlagStatus(id, flagData, token);
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

export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFlag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFlag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.flag.push(action.payload);
      })
      .addCase(createFlag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFlaggedReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlaggedReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.flag = action.payload;
      })
      .addCase(getFlaggedReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFlagStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFlagStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.flag.findIndex(
          (flag) => flag._id === action.payload._id
        );

        if (index !== -1) {
          state.flag[index] = action.payload;
        }
      })
      .addCase(updateFlagStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = flagSlice.actions;
export default flagSlice.reducer;
