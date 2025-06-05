import React from 'react';
import styles from './Pagination.module.css';

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
        <div className={styles.wrapper}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
                className={`${styles.button} ${styles.left} ${!hasPreviousPage ? styles.disabled : ''}`}
            >
                Назад
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={styles.pageButton}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className={styles.ellipsis}>...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={styles.pageButton}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className={`${styles.button} ${styles.right} ${!hasNextPage ? styles.disabled : ''}`}
            >
                Вперед
            </button>
        </div>
    );
};

export default Pagination;