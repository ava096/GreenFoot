import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import reportReducer from "../features/reports/reportSlice";
import treeReducer from "../features/trees/treeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    tree: treeReducer,
  },
});
