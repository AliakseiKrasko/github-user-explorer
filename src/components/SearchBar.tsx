import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGithubUser, clearUser } from '../store/userSlice';
import type {AppDispatch} from "../store";

const SearchBar: React.FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            dispatch(fetchGithubUser(username.trim()));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (!e.target.value) {
            dispatch(clearUser());
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <input
                type="text"
                value={username}
                onChange={handleChange}
                placeholder="Введите GitHub username"
                style={{ padding: 8, fontSize: 16 }}
            />
            <button type="submit" style={{ marginLeft: 8, padding: '8px 16px' }}>
                Поиск
            </button>
        </form>
    );
};

export default SearchBar;