import React from 'react';


import type {GithubUser} from "../types/github.ts";
import {formatNumber} from "../hooks/useDebounce.ts";

interface UserCardProps {
    user: GithubUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start gap-4">
            <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full border-2 border-gray-200"
            />
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors">
                        {user.login}
                    </a>
                </h2>
                {user.name && <p className="text-gray-700 font-medium mb-1">{user.name}</p>}
                {user.bio && <p className="text-gray-600 mb-3">{user.bio}</p>}
                <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                        {formatNumber(user.public_repos)} репозиториев
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatNumber(user.followers)} подписчиков
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 12a4 4 0 100-8 4 4 0 000 8zM8 0a8 8 0 100 16A8 8 0 008 0z" />
                        </svg>
                        {formatNumber(user.following)} подписок
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default React.memo(UserCard);