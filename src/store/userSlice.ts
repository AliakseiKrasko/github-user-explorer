import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { GithubUser, LoadingState } from '../types/github';
import { API_CONFIG } from '../constants';

interface UserState {
    user: GithubUser | null;
    loadingState: LoadingState;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loadingState: LoadingState.IDLE,
    error: null,
};

export const fetchGithubUser = createAsyncThunk<GithubUser, string>(
    'user/fetchGithubUser',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get<GithubUser>(
                `${API_CONFIG.BASE_URL}/users/${username}`
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data?.message || 'User not found');
            }
            return rejectWithValue('Network error occurred');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null;
            state.error = null;
            state.loadingState = LoadingState.IDLE;
        },
        clearUserError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubUser.pending, (state) => {
                state.loadingState = LoadingState.PENDING;
                state.error = null;
            })
            .addCase(fetchGithubUser.fulfilled, (state, action: PayloadAction<GithubUser>) => {
                state.loadingState = LoadingState.FULFILLED;
                state.user = action.payload;
            })
            .addCase(fetchGithubUser.rejected, (state, action) => {
                state.loadingState = LoadingState.REJECTED;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser, clearUserError } = userSlice.actions;
export default userSlice.reducer;

// store/repoSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { GithubRepo, LoadingState } from '../types/github';
import { API_CONFIG, LIMITS } from '../constants';

interface RepoState {
    repos: GithubRepo[];
    loadingState: LoadingState;
    error: string | null;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
    selectedLanguage: string;
}

const initialState: RepoState = {
    repos: [],
    loadingState: LoadingState.IDLE,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    selectedLanguage: '',
};

export const fetchGithubRepos = createAsyncThunk<GithubRepo[], string>(
    'repos/fetchGithubRepos',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get<GithubRepo[]>(
                `${API_CONFIG.BASE_URL}/users/${username}/repos?per_page=${API_CONFIG.REPOS_PER_PAGE}&sort=updated`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error loading repositories');
        }
    }
);

const repoSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        clearRepos(state) {
            state.repos = [];
            state.error = null;
            state.loadingState = LoadingState.IDLE;
            state.currentPage = 1;
            state.totalPages = 1;
            state.searchTerm = '';
            state.selectedLanguage = '';
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
            state.currentPage = 1;
        },
        setSelectedLanguage(state, action: PayloadAction<string>) {
            state.selectedLanguage = action.payload;
            state.currentPage = 1;
        },
        clearRepoError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubRepos.pending, (state) => {
                state.loadingState = LoadingState.PENDING;
                state.error = null;
            })
            .addCase(fetchGithubRepos.fulfilled, (state, action: PayloadAction<GithubRepo[]>) => {
                state.loadingState = LoadingState.FULFILLED;
                state.repos = action.payload;
                state.totalPages = Math.ceil(action.payload.length / LIMITS.REPOS_PER_PAGE);
            })
            .addCase(fetchGithubRepos.rejected, (state, action) => {
                state.loadingState = LoadingState.REJECTED;
                state.error = action.payload as string;
            });
    },
});

export const { clearRepos, setPage, setSearchTerm, setSelectedLanguage, clearRepoError } = repoSlice.actions;
export default repoSlice.reducer;

// store/searchHistorySlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS, LIMITS } from '../constants';

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