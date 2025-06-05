import React from 'react';
import type { GithubRepo } from '../types/github';
import { formatDate, formatNumber, truncateText } from '../utils/formatters';
import { getLanguageColor } from '../utils/github';

interface RepoCardProps {
    repo: GithubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                    {repo.name}
                </a>
            </h3>
        </div>

        {repo.description && (
            <p className="text-gray-600 text-sm mb-3">
                {truncateText(repo.description, 120)}
            </p>
        )}

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
                {repo.language && (
                    <span className="flex items-center gap-1">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {formatNumber(repo.stargazers_count)}
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {formatNumber(repo.forks_count)}
                </span>
            </div>
            <span className="text-xs text-gray-500">
                Обновлено {formatDate(repo.updated_at)}
            </span>
        </div>
    </div>
);

export default React.memo(RepoCard);