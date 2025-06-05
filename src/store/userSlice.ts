import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    name?: string;
    bio?: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
}

interface UserState {
    user: GithubUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchGithubUser = createAsyncThunk<GithubUser, string>(
    'user/fetchGithubUser',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'User not found');
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
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.user = null;
            })
            .addCase(fetchGithubUser.fulfilled, (state, action: PayloadAction<GithubUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchGithubUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;