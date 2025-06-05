import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', text }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`} />
            {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;

// components/ui/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onDismiss }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3 flex-1">
                <p className="text-sm text-red-800">{message}</p>
                <div className="mt-2 flex space-x-2">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="text-sm text-red-600 hover:text-red-500 underline"
                        >
                            Повторить
                        </button>
                    )}
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="text-sm text-red-600 hover:text-red-500 underline"
                        >
                            Скрыть
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ErrorMessage;

// components/ui/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                                   hasNextPage,
                                                   hasPreviousPage,
                                               }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-1 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Назад
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                        page === currentPage
                            ? 'bg-blue-50 text-blue-600 border-blue-500'
                            : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Вперед
            </button>
        </div>
    );
};

export default Pagination;

// components/ui/LanguageFilter.tsx
import React from 'react';
import { getLanguageColor } from '../../utils/github';

interface LanguageFilterProps {
    languages: string[];
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
                                                           languages,
                                                           selectedLanguage,
                                                           onLanguageChange,
                                                       }) => {
    if (languages.length === 0) return null;

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Фильтр по языку:
            </label>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onLanguageChange('')}
                    className={`px-3 py-1 text-sm rounded-full border ${
                        !selectedLanguage
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                    Все
                </button>
                {languages.map((language) => (
                    <button
                        key={language}
                        onClick={() => onLanguageChange(language)}
                        className={`px-3 py-1 text-sm rounded-full border flex items-center gap-2 ${
                            selectedLanguage === language
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                    >
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(language) }}
                        />
                        {language}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageFilter;