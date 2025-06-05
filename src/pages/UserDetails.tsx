import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithubUser, clearUser } from '../store/userSlice';
import { fetchGithubRepos, clearRepos } from '../store/repoSlice';
import RepoList from '../components/RepoList';
import type {AppDispatch, RootState} from "../store";

const UserDetails: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (username) {
            dispatch(fetchGithubUser(username));
            dispatch(fetchGithubRepos(username));
        }
        return () => {
            dispatch(clearUser());
            dispatch(clearRepos());
        };
    }, [username, dispatch]);

    return (
        <div style={{ maxWidth: 480, margin: '40px auto', padding: 24, background: '#fafafa', borderRadius: 8 }}>
            <Link to="/">&larr; Назад</Link>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <div style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 6 }}>
                    <img src={user.avatar_url} alt={user.login} style={{ width: 80, borderRadius: '50%' }} />
                    <h2>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                    </h2>
                    <p>{user.name}</p>
                    <p>{user.bio}</p>
                    <p>Репозиториев: {user.public_repos}</p>
                    <p>Подписчиков: {user.followers} | Подписок: {user.following}</p>
                    <RepoList />
                </div>
            )}
        </div>
    );
};

export default UserDetails;