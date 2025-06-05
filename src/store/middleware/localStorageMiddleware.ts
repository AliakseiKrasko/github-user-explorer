import type { Middleware } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from "../../constans";

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Type guard: проверяем, что action — это объект с полем type
    if (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        (
            action.type === 'searchHistory/addSearchTerm' ||
            action.type === 'searchHistory/clearSearchHistory'
        )
    ) {
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