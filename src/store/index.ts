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

// store/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

// User selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loadingState;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoadingState = (state: RootState) => state.user.loadingState;

// Repos selectors
export const selectRepos = (state: RootState) => state.repos.repos;
export const selectReposLoading = (state: RootState) => state.repos.loadingState;
export const selectReposError = (state: RootState) => state.repos.error;
export const selectReposPage = (state: RootState) => state.repos.currentPage;
export const selectReposTotalPages = (state: RootState) => state.repos.totalPages;

// Memoized selectors
export const selectPaginatedRepos = createSelector(
    [selectRepos, selectReposPage],
    (repos, currentPage) => {
        const startIndex = (currentPage - 1) * 30;
        return repos.slice(startIndex, startIndex + 30);
    }
);

export const selectReposByLanguage = createSelector(
    [selectRepos, (state: RootState, language: string) => language],
    (repos, language) =>
        language ? repos.filter(repo => repo.language === language) : repos
);

// Search history selectors
export const selectSearchHistory = (state: RootState) => state.searchHistory.history;
export const selectUniqueLanguages = createSelector(
    [selectRepos],
    (repos) => [...new Set(repos.map(repo => repo.language).filter(Boolean))]
);

// store/middleware/localStorageMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Save search history to localStorage
    if (action.type === 'searchHistory/addSearchTerm' || action.type === 'searchHistory/clearSearchHistory') {
        const state = store.getState();
        try {
            localStorage.setItem(
                STORAGE_KEYS.SEARCH_HISTORY,
                JSON.stringify(state.searchHistory.history)
            );
        } catch (error) {
            console.warn('Failed to save search history to localStorage:', error);
        }
    }

    return result;
};