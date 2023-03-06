import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from "@/app/services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
