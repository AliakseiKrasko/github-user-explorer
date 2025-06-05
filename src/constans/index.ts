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