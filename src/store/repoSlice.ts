import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {type GithubRepo, type LoadingState, LoadingStateEnum} from "../types/github.ts";
import {API_CONFIG, LIMITS} from "../constans";
// import { GithubRepo, LoadingState } from '../types/github';
// import { API_CONFIG, LIMITS } from '../constants';

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
    loadingState: LoadingStateEnum.IDLE,
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
            state.loadingState = LoadingStateEnum.IDLE;
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
                state.loadingState = LoadingStateEnum.PENDING;
                state.error = null;
            })
            .addCase(fetchGithubRepos.fulfilled, (state, action: PayloadAction<GithubRepo[]>) => {
                state.loadingState = LoadingStateEnum.FULFILLED;
                state.repos = action.payload;
                state.totalPages = Math.ceil(action.payload.length / LIMITS.REPOS_PER_PAGE);
            })
            .addCase(fetchGithubRepos.rejected, (state, action) => {
                state.loadingState = LoadingStateEnum.REJECTED;
                state.error = action.payload as string;
            });
    },
});

export const { clearRepos, setPage, setSearchTerm, setSelectedLanguage, clearRepoError } = repoSlice.actions;
export default repoSlice.reducer;