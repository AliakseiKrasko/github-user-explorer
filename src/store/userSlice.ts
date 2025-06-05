import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {type GithubUser, type LoadingState, LoadingStateEnum} from "../types/github.ts";
import {API_CONFIG} from "../constans";


interface UserState {
    user: GithubUser | null;
    loadingState: LoadingState;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loadingState: LoadingStateEnum.IDLE,
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
            state.loadingState = LoadingStateEnum.IDLE;
        },
        clearUserError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubUser.pending, (state) => {
                state.loadingState = LoadingStateEnum.PENDING;
                state.error = null;
            })
            .addCase(fetchGithubUser.fulfilled, (state, action: PayloadAction<GithubUser>) => {
                state.loadingState = LoadingStateEnum.FULFILLED;
                state.user = action.payload;
            })
            .addCase(fetchGithubUser.rejected, (state, action) => {
                state.loadingState = LoadingStateEnum.REJECTED;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser, clearUserError } = userSlice.actions;
export default userSlice.reducer;