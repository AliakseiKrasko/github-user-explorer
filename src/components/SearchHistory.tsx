import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectSearchHistory } from '../store/selectors';
import { clearSearchHistory, removeSearchTerm } from '../store/searchHistorySlice';

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
            <div className="text-center py-8">
                <p className="text-gray-500">История поиска пуста</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">История поиска</h2>
                <button
                    onClick={handleClearHistory}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                    Очистить всё
                </button>
            </div>

            <div className="space-y-2">
                {history.map((username, index) => (
                    <div
                        key={`${username}-${index}`}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                    >
                        <Link
                            to={`/user/${username}`}
                            className="flex-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            {username}
                        </Link>
                        <button
                            onClick={(e) => handleRemoveTerm(username, e)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            title="Удалить из истории"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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