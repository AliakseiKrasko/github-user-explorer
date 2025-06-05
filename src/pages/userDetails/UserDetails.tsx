import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./UserDetails.module.css";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {selectUser, selectUserError, selectUserLoading} from "../../store/selectors.ts";
import {clearUser, fetchGithubUser} from "../../store/userSlice.ts";
import {clearRepos, fetchGithubRepos} from "../../store/repoSlice.ts";
import { addSearchTerm } from '../../store/searchHistorySlice.ts';
import {LoadingStateEnum} from "../../types/github.ts";
import LoadingSpinner from "../../components/ui/LoadingSpinner.tsx";
import ErrorMessage from "../../components/ui/ErrorMessage.tsx";
import UserCard from "../../components/userCard/UserCard.tsx";
import RepoList from "../../components/repoList/RepoList.tsx";

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
        <div className={styles.screenBg}>
            <div className={styles.container}>
                <div className={styles.backBox}>
                    <Link
                        to="/"
                        className={styles.backLink}
                    >
                        <svg className={styles.backIcon} fill="currentColor" viewBox="0 0 20 20">
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
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIconBox}>
                            <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className={styles.emptyTitle}>
                            Пользователь не найден
                        </h3>
                        <p className={styles.emptySubtitle}>
                            Не удалось найти пользователя с именем "{username}"
                        </p>
                        <Link
                            to="/"
                            className={styles.tryAgainBtn}
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