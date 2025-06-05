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