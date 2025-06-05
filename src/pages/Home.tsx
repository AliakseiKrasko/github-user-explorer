import React, {useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import RepoList from '../components/RepoList';
import {clearRepos, fetchGithubRepos} from '../store/repoSlice';
import {addSearchTerm} from '../store/searchHistorySlice';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";

const Home: React.FC = () => {
    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    // Загружаем репозитории когда найден новый пользователь
    useEffect(() => {
        if (user?.login) {
            dispatch(fetchGithubRepos(user.login));
            dispatch(addSearchTerm(user.login));
        } else {
            dispatch(clearRepos());
        }
    }, [user, dispatch]);

    return (
        <div style={{ maxWidth: 480, margin: '40px auto', padding: 24, background: '#fafafa', borderRadius: 8 }}>
            <h1>GitHub User Explorer</h1>
            <SearchBar />
            {/*<SearchHistory />*/}
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

export default Home;