import React, { useState, useCallback } from 'react';
import { fetchGithubUser, clearUser, clearUserError } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useDebounce } from '../hooks/useDebounce';
import { API_CONFIG } from '../constants';
import { selectUserLoadingState } from '../store/selectors';
import { LoadingState } from '../types/github';

const SearchBar: React.FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useAppDispatch();
    const loadingState = useAppSelector(selectUserLoadingState);
    const debouncedUsername = useDebounce(username.trim(), API_CONFIG.SEARCH_DEBOUNCE_MS);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (debouncedUsername) {
            dispatch(fetchGithubUser(debouncedUsername));
        }
    }, [debouncedUsername, dispatch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);

        if (!value.trim()) {
            dispatch(clearUser());
        } else {
            dispatch(clearUserError());
        }
    }, [dispatch]);

    React.useEffect(() => {
        if (debouncedUsername && username === debouncedUsername) {
            dispatch(fetchGithubUser(debouncedUsername));
        }
    }, [debouncedUsername, username, dispatch]);

    const isLoading = loadingState === LoadingState.PENDING;

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        placeholder="Введите GitHub username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={!username.trim() || isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Поиск
                </button>
            </div>
        </form>
    );
};

export default React.memo(SearchBar);