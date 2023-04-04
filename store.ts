import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { statusApi } from "slices/apiSlice";
export const store = configureStore({
	reducer: {
		[statusApi.reducerPath]: statusApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(statusApi.middleware),
});
