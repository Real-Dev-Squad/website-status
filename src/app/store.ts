import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from "@/app/services/api";
import type { PreloadedState } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
 return configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']