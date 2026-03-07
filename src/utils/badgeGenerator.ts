/**
 * Generate shields.io badge markdown for a GitHub repository.
 */
export function generateBadges(owner: string, repo: string): string {
    const base = `https://img.shields.io/github`;
    const badges = [
        `[![GitHub Stars](${base}/stars/${owner}/${repo}?style=for-the-badge&logo=github&logoColor=white&color=0969da)](https://github.com/${owner}/${repo}/stargazers)`,
        `[![GitHub Forks](${base}/forks/${owner}/${repo}?style=for-the-badge&logo=git&logoColor=white&color=8250df)](https://github.com/${owner}/${repo}/network/members)`,
        `[![GitHub Issues](${base}/issues/${owner}/${repo}?style=for-the-badge&logo=github&logoColor=white&color=e5534b)](https://github.com/${owner}/${repo}/issues)`,
        `[![GitHub License](${base}/license/${owner}/${repo}?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=2da44e)](https://github.com/${owner}/${repo}/blob/main/LICENSE)`,
        `[![Last Commit](${base}/last-commit/${owner}/${repo}?style=for-the-badge&logo=git&logoColor=white&color=f9826c)](https://github.com/${owner}/${repo}/commits)`,
    ];
    return badges.join('\n');
}

export function generateLanguageBadges(languages: Record<string, number>): string {
    const langColors: Record<string, string> = {
        TypeScript: '3178c6',
        JavaScript: 'f1e05a',
        Python: '3572A5',
        Java: 'b07219',
        'C++': 'f34b7d',
        C: '555555',
        'C#': '239120',
        Go: '00ADD8',
        Rust: 'dea584',
        Ruby: '701516',
        PHP: '4F5D95',
        Swift: 'F05138',
        Kotlin: 'A97BFF',
        Dart: '00B4AB',
        HTML: 'e34c26',
        CSS: '563d7c',
        Shell: '89e051',
        Dockerfile: '384d54',
    };

    return Object.keys(languages)
        .slice(0, 6)
        .map((lang) => {
            const color = langColors[lang] || '555555';
            const encoded = encodeURIComponent(lang);
            return `![${lang}](https://img.shields.io/badge/${encoded}-${color}?style=for-the-badge&logo=${encoded.toLowerCase()}&logoColor=white)`;
        })
        .join(' ');
}
