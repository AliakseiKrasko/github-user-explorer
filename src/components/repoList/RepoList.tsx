import React, { useMemo } from 'react';
import styles from './RepoList.module.css';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {
    selectRepos,
    selectReposError,
    selectReposLoading,
    selectReposPage,
    selectUniqueLanguages
} from "../../store/selectors.ts";
import {LIMITS} from "../../constans";
import {usePagination} from "../../hooks/usePagination.ts";
import {setPage, setSearchTerm, setSelectedLanguage} from "../../store/repoSlice.ts";
import {LoadingStateEnum} from "../../types/github.ts";
import LoadingSpinner from "../ui/loadingSpinner/LoadingSpinner.tsx";
import ErrorMessage from "../ui/errorMessage/ErrorMessage.tsx";
import LanguageFilter from "../ui/languageFilter/LanguageFilter.tsx";
import RepoCard from "../repoCard/RepoCard.tsx";
import Pagination from "../ui/pagination/Pagination.tsx";




const RepoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const repos = useAppSelector(selectRepos);
    const loadingState = useAppSelector(selectReposLoading);
    const error = useAppSelector(selectReposError);
    const currentPage = useAppSelector(selectReposPage);
    const uniqueLanguages = useAppSelector(selectUniqueLanguages);

    const [searchTerm, setSearchTermLocal] = React.useState('');
    const [selectedLanguage, setSelectedLanguageLocal] = React.useState('');

    const filteredRepos = useMemo(() => {
        let filtered = repos;

        if (searchTerm) {
            filtered = filtered.filter(repo =>
                repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedLanguage) {
            filtered = filtered.filter(repo => repo.language === selectedLanguage);
        }

        return filtered;
    }, [repos, searchTerm, selectedLanguage]);

    const paginatedFilteredRepos = useMemo(() => {
        const startIndex = (currentPage - 1) * LIMITS.REPOS_PER_PAGE;
        return filteredRepos.slice(startIndex, startIndex + LIMITS.REPOS_PER_PAGE);
    }, [filteredRepos, currentPage]);

    const { hasNextPage, hasPreviousPage } = usePagination({
        totalItems: filteredRepos.length,
        itemsPerPage: LIMITS.REPOS_PER_PAGE,
        currentPage,
    });

    const handlePageChange = React.useCallback((page: number) => {
        dispatch(setPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [dispatch]);

    const handleSearchChange = React.useCallback((value: string) => {
        setSearchTermLocal(value);
        dispatch(setSearchTerm(value));
        dispatch(setPage(1));
    }, [dispatch]);

    const handleLanguageChange = React.useCallback((language: string) => {
        setSelectedLanguageLocal(language);
        dispatch(setSelectedLanguage(language));
        dispatch(setPage(1));
    }, [dispatch]);

    if (loadingState === LoadingStateEnum.PENDING) {
        return <LoadingSpinner size="large" text="Загружаем репозитории..." />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!repos.length) {
        return <p className={styles.emptyText}>Репозитории не найдены.</p>;
    }

    const actualTotalPages = Math.ceil(filteredRepos.length / LIMITS.REPOS_PER_PAGE);

    return (
        <div className={styles.repoListWrapper}>
            <div className={styles.filtersBox}>
                <h3 className={styles.heading}>
                    Публичные репозитории ({filteredRepos.length})
                </h3>

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <LanguageFilter
                    languages={uniqueLanguages.filter((l): l is string => l !== null)}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                />
            </div>

            <div className={styles.repoGrid}>
                {paginatedFilteredRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>

            {actualTotalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={actualTotalPages}
                    onPageChange={handlePageChange}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                />
            )}
        </div>
    );
};

export default React.memo(RepoList);