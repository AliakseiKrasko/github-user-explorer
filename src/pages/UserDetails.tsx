import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGithubUser, clearUser } from '../store/userSlice';
import { fetchGithubRepos, clearRepos } from '../store/repoSlice';
import { addSearchTerm } from '../store/searchHistorySlice';
// import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser, selectUserLoading, selectUserError } from '../store/selectors';
// import { LoadingState } from '../types/github';
import UserCard from '../components/UserCard';
import RepoList from '../components/RepoList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {LoadingStateEnum} from "../types/github.ts";

const UserDetails: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loadingState = useAppSelector(selectUserLoading);
    const error = useAppSelector(selectUserError);

    useEffect(() => {
        if (username) {
            dispatch(fetchGithubUser(username));
            dispatch(fetchGithubRepos(username));
            dispatch(addSearchTerm(username));
        }

        return () => {
            dispatch(clearUser());
            dispatch(clearRepos());
        };
    }, [username, dispatch]);

    const isLoading = loadingState === LoadingStateEnum.PENDING;

    const handleRetry = React.useCallback(() => {
        if (username) {
            dispatch(fetchGithubUser(username));
            dispatch(fetchGithubRepos(username));
        }
    }, [username, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Назад к поиску
                    </Link>
                </div>

                {isLoading && (
                    <LoadingSpinner size="large" text="Загрузка профиля..." />
                )}

                {error && (
                    <ErrorMessage
                        message={error}
                        onRetry={handleRetry}
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Пользователь не найден
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Не удалось найти пользователя с именем "{username}"
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Попробовать другой поиск
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;