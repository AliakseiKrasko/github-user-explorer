import React, { useEffect } from 'react';
import styles from "./Home.module.css";
import {selectUser, selectUserError, selectUserLoading} from "../../store/selectors.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {clearRepos, fetchGithubRepos} from "../../store/repoSlice.ts";
import {addSearchTerm} from "../../store/searchHistorySlice.ts";
import {LoadingStateEnum} from "../../types/github.ts";
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import LoadingSpinner from "../../components/ui/loadingSpinner/LoadingSpinner.tsx";
import ErrorMessage from "../../components/ui/errorMessage/ErrorMessage.tsx";
import UserCard from "../../components/userCard/UserCard.tsx";
import RepoList from "../../components/repoList/RepoList.tsx";

const Home: React.FC = () => {
    const user = useAppSelector(selectUser);
    const loadingState = useAppSelector(selectUserLoading);
    const error = useAppSelector(selectUserError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user?.login) {
            dispatch(fetchGithubRepos(user.login));
            dispatch(addSearchTerm(user.login));
        } else {
            dispatch(clearRepos());
        }
    }, [user, dispatch]);

    const isLoading = loadingState === LoadingStateEnum.PENDING;

    return (
        <div className={styles.screenBg}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        GitHub User Explorer
                    </h1>
                    <p className={styles.subtitle}>
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
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIconBox}>
                            <svg className={styles.emptyIcon} fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className={styles.emptyTitle}>
                            Начните поиск
                        </h3>
                        <p className={styles.emptySubtitle}>
                            Введите имя пользователя GitHub, чтобы найти информацию о нём и его репозиториях
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;