import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import repoReducer from './repoSlice';
import searchHistoryReducer from './searchHistorySlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
    reducer: {
        user: userReducer,
        repos: repoReducer,
        searchHistory: searchHistoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;