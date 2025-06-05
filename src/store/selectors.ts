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
    [selectRepos, (_: RootState, language: string) => language],
    (repos, language) =>
        language ? repos.filter(repo => repo.language === language) : repos
);

// Search history selectors
export const selectSearchHistory = (state: RootState) => state.searchHistory.history;
export const selectUniqueLanguages = createSelector(
    [selectRepos],
    (repos) => [...new Set(repos.map(repo => repo.language).filter(Boolean))]
);
