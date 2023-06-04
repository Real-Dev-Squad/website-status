import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '@/app/services/api';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    user: userReducer,
});

export const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
