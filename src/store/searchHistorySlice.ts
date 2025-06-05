import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const HISTORY_LIMIT = 10
const STORAGE_KEY = 'search_history'

const loadInitialState = (): string[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

const saveToStorage = (history: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

interface SearchHistoryState {
    history: string[]
}

const initialState: SearchHistoryState = {
    history: loadInitialState(),
}

const searchHistorySlice = createSlice({
    name: 'searchHistory',
    initialState,
    reducers: {
        addSearchTerm: (state, action: PayloadAction<string>) => {
            const term = action.payload.trim()
            if (!term) return

            // удаляем дубликат и добавляем в начало
            state.history = [term, ...state.history.filter((t) => t !== term)].slice(0, HISTORY_LIMIT)
            saveToStorage(state.history)
        },
        clearSearchHistory: (state) => {
            state.history = []
            saveToStorage(state.history)
        },
    },
})

export const { addSearchTerm, clearSearchHistory } = searchHistorySlice.actions
export default searchHistorySlice.reducer