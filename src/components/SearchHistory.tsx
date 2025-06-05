import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type {RootState} from "../store";

const SearchHistory: React.FC = () => {
    const history = useSelector((state: RootState) => state.searchHistory.history);

    if (!history.length) return null;

    return (
        <div style={{ marginBottom: 16 }}>
            <strong>История поиска:</strong>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {history.map((username) => (
                    <li key={username}>
                        <Link to={`/user/${username}`}>{username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;