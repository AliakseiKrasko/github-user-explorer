import React from 'react';
import { useSelector } from 'react-redux';
import type {RootState} from "../store";


const RepoList: React.FC = () => {
    const { repos, loading, error } = useSelector((state: RootState) => state.repos);

    if (loading) return <p>Загрузка репозиториев...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!repos.length) return <p>Репозитории не найдены.</p>;

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Публичные репозитории:</h3>
            <ul style={{ paddingLeft: 0 }}>
                {repos.map(repo => (
                    <li key={repo.id} style={{ marginBottom: 8, listStyle: 'none' }}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <strong>{repo.name}</strong>
                        </a>
                        {repo.description && <div style={{ fontSize: 14 }}>{repo.description}</div>}
                        <div style={{ fontSize: 12, color: '#555' }}>
                            ★ {repo.stargazers_count} | Forks: {repo.forks_count} | {repo.language} | Обновлено: {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepoList;