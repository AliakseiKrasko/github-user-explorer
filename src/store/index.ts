import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import repoReducer from './repoSlice';
import searchHistoryReducer from './searchHistorySlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        repos: repoReducer,
        searchHistory: searchHistoryReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;