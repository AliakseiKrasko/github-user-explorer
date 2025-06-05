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