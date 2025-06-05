import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import type {GithubRepo} from "../types/github.ts";


interface RepoState {
    repos: GithubRepo[];
    loading: boolean;
    error: string | null;
}

const initialState: RepoState = {
    repos: [],
    loading: false,
    error: null,
};

export const fetchGithubRepos = createAsyncThunk<GithubRepo[], string>(
    'repos/fetchGithubRepos',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get<GithubRepo[]>(
                `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error loading repos');
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
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubRepos.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.repos = [];
            })
            .addCase(fetchGithubRepos.fulfilled, (state, action: PayloadAction<GithubRepo[]>) => {
                state.loading = false;
                state.repos = action.payload;
            })
            .addCase(fetchGithubRepos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearRepos } = repoSlice.actions;
export default repoSlice.reducer;