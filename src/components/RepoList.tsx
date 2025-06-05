import React, { useMemo } from 'react';
import {
    selectPaginatedRepos,
    selectReposLoading,
    selectReposError,
    selectReposPage,
    selectReposTotalPages,
    selectUniqueLanguages,
    selectRepos
} from '../store/';
import { LoadingState } from '../types/github';
// import { usePagination } from '../hooks/usePagination';
// import { LIMITS } from '../constants';
import RepoCard from './RepoCard';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import Pagination from './ui/Pagination';
// import LanguageFilter from './ui/LanguageFilter';
import {useAppDispatch, useAppSelector} from "../hooks/useDebounce.ts";
import {setPage, setSearchTerm, setSelectedLanguage} from "../store/userSlice.ts";
import LanguageFilter from "./ui/LoadingSpinner";

const RepoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const repos = useAppSelector(selectRepos);
    const paginatedRepos = useAppSelector(selectPaginatedRepos);
    const loadingState = useAppSelector(selectReposLoading);
    const error = useAppSelector(selectReposError);
    const currentPage = useAppSelector(selectReposPage);
    const totalPages = useAppSelector(selectReposTotalPages);
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

    if (loadingState === LoadingState.PENDING) {
        return <LoadingSpinner size="large" text="Загружаем репозитории..." />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!repos.length) {
        return <p className="text-gray-500 text-center py-8">Репозитории не найдены.</p>;
    }

    const actualTotalPages = Math.ceil(filteredRepos.length / LIMITS.REPOS_PER_PAGE);

    return (
        <div className="mt-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Публичные репозитории ({filteredRepos.length})
                </h3>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <LanguageFilter
                    languages={uniqueLanguages}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                />
            </div>

            <div className="grid gap-4">
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