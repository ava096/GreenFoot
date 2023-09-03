import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "../reports/reportService";

const initialState = {
  report: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new report
export const createReport = createAsyncThunk(
  "report/create",
  async (reportData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.createReport(reportData, token);
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

export const getAllReports = createAsyncThunk(
  "report/getAll",
  async (_, thunkAPI) => {
    try {
      return await reportService.getAllReports();
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

// Get user reports
export const getUserReports = createAsyncThunk(
  "report/getAllUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.getUserReports(token);
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

// Delete a user's report
export const deleteReport = createAsyncThunk(
  "report/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.deleteReport(id, token);
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

// Update a report
export const updateReport = createAsyncThunk(
  "report/update",
  async ({ id, reportData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.updateReport(id, reportData, token);
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

// Upvote a report
export const upvoteReport = createAsyncThunk(
  "report/upvote",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await reportService.upvoteReport(id, token);
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

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report = action.payload;
      })
      .addCase(getUserReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report = state.report.filter(
          (report) => report._id !== action.payload.id
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.report.findIndex(
          (report) => report._id === action.payload._id
        );

        if (index !== -1) {
          state.report[index] = action.payload;
        }
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(upvoteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upvoteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.report.findIndex(
          (report) => report._id === action.payload._id
        );
        if (index !== -1) {
          state.report[index] = action.payload;
        }
      })
      .addCase(upvoteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
