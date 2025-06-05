import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import RepoList from '../components/RepoList';
import { clearRepos, fetchGithubRepos } from '../store/repoSlice';
import { addSearchTerm } from '../store/searchHistorySlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser, selectUserLoading, selectUserError } from '../store/selectors';
import { LoadingState } from '../types/github';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const Home: React.FC = () => {
    const user = useAppSelector(selectUser);
    const loadingState = useAppSelector(selectUserLoading);
    const error = useAppSelector(selectUserError);
    const dispatch = useAppDispatch();

    // Загружаем репозитории когда найден новый пользователь
    useEffect(() => {
        if (user?.login) {
            dispatch(fetchGithubRepos(user.login));
            dispatch(addSearchTerm(user.login));
        } else {
            dispatch(clearRepos());
        }
    }, [user, dispatch]);

    const isLoading = loadingState === LoadingState.PENDING;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        GitHub User Explorer
                    </h1>
                    <p className="text-gray-600">
                        Найдите пользователя GitHub и изучите его репозитории
                    </p>
                </div>

                <SearchBar />

                {isLoading && (
                    <LoadingSpinner size="large" text="Поиск пользователя..." />
                )}

                {error && (
                    <ErrorMessage
                        message={error}
                        onRetry={() => user?.login && dispatch(fetchGithubRepos(user.login))}
                    />
                )}

                {user && !isLoading && (
                    <>
                        <UserCard user={user} />
                        <RepoList />
                    </>
                )}

                {!user && !isLoading && !error && (
                    <div className="text-center py-12">
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Начните поиск
                        </h3>
                        <p className="text-gray-500">
                            Введите имя пользователя GitHub, чтобы найти информацию о нём и его репозиториях
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;