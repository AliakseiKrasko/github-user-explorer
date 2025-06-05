
export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    name?: string;
    bio?: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
}

export interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
}

export enum LoadingState {
    IDLE = 'idle',
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

// constants/index.ts
export const API_CONFIG = {
    BASE_URL: 'https://api.github.com',
    REPOS_PER_PAGE: 100,
    SEARCH_DEBOUNCE_MS: 300,
} as const;

export const STORAGE_KEYS = {
    SEARCH_HISTORY: 'github_search_history',
} as const;

export const LIMITS = {
    SEARCH_HISTORY: 10,
    REPOS_PER_PAGE: 30,
} as const;