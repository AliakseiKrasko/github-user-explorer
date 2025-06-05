import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchHistoryState {
    history: string[];
}

const initialState: SearchHistoryState = {
    history: [],
};

const MAX_HISTORY = 10;

const searchHistorySlice = createSlice({
    name: 'searchHistory',
    initialState,
    reducers: {
        addSearchTerm(state, action: PayloadAction<string>) {
            const term = action.payload.trim();
            // Исключаем дубли и ограничиваем размер истории
            state.history = [term, ...state.history.filter(item => item !== term)].slice(0, MAX_HISTORY);
        },
        clearHistory(state) {
            state.history = [];
        },
    },
});

export const { addSearchTerm, clearHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;