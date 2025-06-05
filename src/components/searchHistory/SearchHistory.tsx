import React from 'react';
import { Link } from 'react-router-dom';
import { selectSearchHistory } from '../../store/selectors';
import { clearSearchHistory, removeSearchTerm } from '../../store/searchHistorySlice';
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import styles from "./SearchHistory.module.css";

const SearchHistory: React.FC = () => {
    const history = useAppSelector(selectSearchHistory);
    const dispatch = useAppDispatch();

    const handleClearHistory = React.useCallback(() => {
        dispatch(clearSearchHistory());
    }, [dispatch]);

    const handleRemoveTerm = React.useCallback((term: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeSearchTerm(term));
    }, [dispatch]);

    if (!history.length) {
        return (
            <div className={styles.emptyBox}>
                <p className={styles.emptyText}>История поиска пуста</p>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.heading}>История поиска</h2>
                <button
                    onClick={handleClearHistory}
                    className={styles.clearBtn}
                >
                    Очистить всё
                </button>
            </div>

            <div className={styles.list}>
                {history.map((username, index) => (
                    <div
                        key={`${username}-${index}`}
                        className={styles.item}
                    >
                        <Link
                            to={`/user/${username}`}
                            className={styles.username}
                        >
                            {username}
                        </Link>
                        <button
                            onClick={(e) => handleRemoveTerm(username, e)}
                            className={styles.removeBtn}
                            title="Удалить из истории"
                        >
                            <svg className={styles.removeIcon} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(SearchHistory);