import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {LIMITS, STORAGE_KEYS} from "../constans";


const loadInitialState = (): string[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.warn('Failed to load search history from localStorage:', error);
        return [];
    }
};

interface SearchHistoryState {
    history: string[];
}

const initialState: SearchHistoryState = {
    history: loadInitialState(),
};

const searchHistorySlice = createSlice({
    name: 'searchHistory',
    initialState,
    reducers: {
        addSearchTerm: (state, action: PayloadAction<string>) => {
            const term = action.payload.trim();
            if (!term) return;

            state.history = [
                term,
                ...state.history.filter((t) => t !== term)
            ].slice(0, LIMITS.SEARCH_HISTORY);
        },
        clearSearchHistory: (state) => {
            state.history = [];
        },
        removeSearchTerm: (state, action: PayloadAction<string>) => {
            state.history = state.history.filter(term => term !== action.payload);
        },
    },
});

export const { addSearchTerm, clearSearchHistory, removeSearchTerm } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;