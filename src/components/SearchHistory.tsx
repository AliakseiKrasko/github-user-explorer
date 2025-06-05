import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGithubUser } from '../store/userSlice';
import { fetchGithubRepos } from '../store/repoSlice';
import type {AppDispatch, RootState} from "../store";


const SearchHistory: React.FC = () => {
    const history = useSelector((state: RootState) => state.searchHistory.history);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (username: string) => {
        dispatch(fetchGithubUser(username));
        dispatch(fetchGithubRepos(username));
    };

    if (!history.length) return null;

    return (
        <div style={{ marginBottom: 16 }}>
            <strong>История поиска:</strong>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {history.map((username) => (
                    <li key={username}>
                        <button
                            style={{ background: 'none', border: 'none', color: '#0366d6', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => handleClick(username)}
                        >
                            {username}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;