import { useMemo } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

export function usePagination({ totalItems, itemsPerPage, currentPage }: UsePaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginationRange = useMemo(() => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta);
             i <= Math.min(totalPages - 1, currentPage + delta);
             i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    }, [currentPage, totalPages]);

    return {
        totalPages,
        paginationRange,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
}