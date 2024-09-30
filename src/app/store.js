import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authReducer from "../features/authSlice";
import cropReducer from "../features/cropSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    crops: cropReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
