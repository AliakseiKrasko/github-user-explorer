import React from 'react';
import { Link } from 'react-router-dom';
import SearchHistory from '../components/SearchHistory';

const HistoryPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Назад к поиску
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        История поиска
                    </h1>
                    <p className="text-gray-600">
                        Ваши последние поиски пользователей GitHub
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <SearchHistory />
            </div>
        </div>
    </div>
);

export default HistoryPage;