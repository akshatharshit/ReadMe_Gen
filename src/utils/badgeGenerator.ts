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

// ── Tech stack badge generator ─────────────────────────────────────

interface TechBadgeInfo {
    logo: string;
    color: string;
}

const TECH_BADGE_MAP: Record<string, TechBadgeInfo> = {
    // Frameworks
    'React': { logo: 'react', color: '20232A' },
    'React Native': { logo: 'react', color: '20232A' },
    'Next.js': { logo: 'nextdotjs', color: '000000' },
    'Nuxt.js': { logo: 'nuxtdotjs', color: '00DC82' },
    'Vue.js': { logo: 'vuedotjs', color: '4FC08D' },
    'Angular': { logo: 'angular', color: 'DD0031' },
    'Svelte': { logo: 'svelte', color: 'FF3E00' },
    'SvelteKit': { logo: 'svelte', color: 'FF3E00' },
    'Gatsby': { logo: 'gatsby', color: '663399' },
    'Remix': { logo: 'remix', color: '000000' },
    'Vite': { logo: 'vite', color: '646CFF' },
    'Express': { logo: 'express', color: '000000' },
    'Fastify': { logo: 'fastify', color: '000000' },
    'Koa': { logo: 'koa', color: '33333D' },
    'NestJS': { logo: 'nestjs', color: 'E0234E' },
    'Electron': { logo: 'electron', color: '47848F' },
    // Build tools
    'TypeScript': { logo: 'typescript', color: '3178C6' },
    'Webpack': { logo: 'webpack', color: '8DD6F9' },
    'esbuild': { logo: 'esbuild', color: 'FFCF00' },
    'Rollup': { logo: 'rollupdotjs', color: 'EC4A3F' },
    'Parcel': { logo: 'parcel', color: '21374B' },
    'TailwindCSS': { logo: 'tailwindcss', color: '06B6D4' },
    // Databases
    'MongoDB': { logo: 'mongodb', color: '47A248' },
    'PostgreSQL': { logo: 'postgresql', color: '4169E1' },
    'MySQL': { logo: 'mysql', color: '4479A1' },
    'Redis': { logo: 'redis', color: 'DC382D' },
    'SQLite': { logo: 'sqlite', color: '003B57' },
    'Firebase': { logo: 'firebase', color: 'FFCA28' },
    'Supabase': { logo: 'supabase', color: '3FCF8E' },
    'DynamoDB': { logo: 'amazondynamodb', color: '4053D6' },
    // ORM / DB Toolkit
    'Prisma': { logo: 'prisma', color: '2D3748' },
    'TypeORM': { logo: 'typeorm', color: 'FE0803' },
    'Sequelize': { logo: 'sequelize', color: '52B0E7' },
    // Auth
    'JWT': { logo: 'jsonwebtokens', color: '000000' },
    'Passport.js': { logo: 'passport', color: '34E27A' },
    'Auth0': { logo: 'auth0', color: 'EB5424' },
    'NextAuth.js': { logo: 'nextdotjs', color: '000000' },
    'Clerk': { logo: 'clerk', color: '6C47FF' },
    // Realtime
    'Socket.IO': { logo: 'socketdotio', color: '010101' },
    'Pusher': { logo: 'pusher', color: '300D4F' },
    // Testing
    'Jest': { logo: 'jest', color: 'C21325' },
    'Vitest': { logo: 'vitest', color: '6E9F18' },
    'Cypress': { logo: 'cypress', color: '17202C' },
    'Playwright': { logo: 'playwright', color: '2EAD33' },
    'Mocha': { logo: 'mocha', color: '8D6748' },
    'Testing Library': { logo: 'testinglibrary', color: 'E33332' },
};

/**
 * Generate a shields.io badge for a tech stack item.
 * Returns the badge markdown or just the name if no mapping found.
 */
export function generateTechBadge(name: string): string {
    const info = TECH_BADGE_MAP[name];
    if (!info) {
        // Fallback: generate a generic badge
        const encoded = encodeURIComponent(name);
        return `![${name}](https://img.shields.io/badge/${encoded}-555555?style=for-the-badge&logoColor=white)`;
    }
    const encoded = encodeURIComponent(name);
    return `![${name}](https://img.shields.io/badge/${encoded}-${info.color}?style=for-the-badge&logo=${info.logo}&logoColor=white)`;
}
