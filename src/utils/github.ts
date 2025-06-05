export const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        Python: '#3572A5',
        Java: '#b07219',
        'C++': '#f34b7d',
        C: '#555555',
        'C#': '#239120',
        PHP: '#4F5D95',
        Ruby: '#701516',
        Go: '#00ADD8',
        Rust: '#dea584',
        Swift: '#ffac45',
        Kotlin: '#F18E33',
        Dart: '#00B4AB',
        HTML: '#e34c26',
        CSS: '#1572B6',
        Shell: '#89e051',
        Vue: '#2c3e50',
        React: '#61dafb',
    };

    return colors[language || ''] || '#8cc8ff';
};