import type { RepoData } from '../types';

export const DEMO_REPO: RepoData = {
    name: 'hyperdrive',
    fullName: 'hyperdrive-sh/hyperdrive',
    description: '⚡ God-Tier Next.js 15 Fullstack SaaS Starter with AI Orchestration, Prisma, Supabase & Realtime WebSockets',
    stars: 14820,
    forks: 1940,
    watchers: 320,
    openIssues: 18,
    license: 'MIT',
    topics: ['nextjs', 'react', 'typescript', 'tailwind', 'prisma', 'supabase', 'ai', 'websockets', 'redis', 'docker'],
    defaultBranch: 'main',
    homepage: 'https://hyperdrive.sh',
    createdAt: '2024-03-15T12:00:00Z',
    updatedAt: '2026-03-10T15:30:00Z',
    owner: 'hyperdrive-sh',
    repo: 'hyperdrive',
    avatarUrl: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    languages: {
        TypeScript: 142050,
        CSS: 21400,
        HTML: 8200,
        Shell: 4100,
        Dockerfile: 2200,
    },
    contents: [
        { name: 'src', path: 'src', type: 'dir' },
        { name: 'app', path: 'src/app', type: 'dir' },
        { name: 'api', path: 'src/app/api', type: 'dir' },
        { name: 'components', path: 'src/components', type: 'dir' },
        { name: 'ui', path: 'src/components/ui', type: 'dir' },
        { name: 'features', path: 'src/features', type: 'dir' },
        { name: 'hooks', path: 'src/hooks', type: 'dir' },
        { name: 'lib', path: 'src/lib', type: 'dir' },
        { name: 'server', path: 'src/server', type: 'dir' },
        { name: 'prisma', path: 'prisma', type: 'dir' },
        { name: 'schema.prisma', path: 'prisma/schema.prisma', type: 'file', size: 3400 },
        { name: 'tests', path: 'tests', type: 'dir' },
        { name: 'docker-compose.yml', path: 'docker-compose.yml', type: 'file', size: 1200 },
        { name: 'Dockerfile', path: 'Dockerfile', type: 'file', size: 850 },
        { name: '.env.example', path: '.env.example', type: 'file', size: 620 },
        { name: 'package.json', path: 'package.json', type: 'file', size: 2100 },
        { name: 'README.md', path: 'README.md', type: 'file', size: 4500 },
        { name: 'tsconfig.json', path: 'tsconfig.json', type: 'file', size: 680 },
        { name: 'vitest.config.ts', path: 'vitest.config.ts', type: 'file', size: 450 },
    ],
    packageJson: {
        name: 'hyperdrive',
        version: '2.4.0',
        description: 'Next.js 15 Fullstack SaaS with AI Orchestration',
        scripts: {
            dev: 'next dev --turbo',
            build: 'next build',
            start: 'next start',
            lint: 'eslint . --max-warnings 0',
            test: 'vitest run',
            'test:e2e': 'playwright test',
            'db:migrate': 'prisma migrate deploy',
            'db:seed': 'prisma db seed',
            docker: 'docker-compose up -d',
        },
        dependencies: {
            next: '^15.1.0',
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            '@prisma/client': '^6.0.0',
            '@supabase/supabase-js': '^2.45.0',
            tailwindcss: '^4.0.0',
            '@tanstack/react-query': '^5.60.0',
            zod: '^3.23.8',
            zustand: '^5.0.0',
            'socket.io-client': '^4.8.0',
            'lucide-react': '^0.460.0',
            'framer-motion': '^11.12.0',
        },
        devDependencies: {
            typescript: '^5.7.0',
            prisma: '^6.0.0',
            vitest: '^2.1.0',
            '@playwright/test': '^1.49.0',
            eslint: '^9.15.0',
        },
    },
    hasReadme: true,
    contributors: [
        { login: 'shadcn', avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4', contributions: 240 },
        { login: 'antfu', avatarUrl: 'https://avatars.githubusercontent.com/u/11247099?v=4', contributions: 185 },
        { login: 'rauchg', avatarUrl: 'https://avatars.githubusercontent.com/u/13041?v=4', contributions: 130 },
        { login: 'leeerob', avatarUrl: 'https://avatars.githubusercontent.com/u/9113740?v=4', contributions: 95 },
        { login: 'delbaoliveira', avatarUrl: 'https://avatars.githubusercontent.com/u/2330752?v=4', contributions: 78 },
        { login: 'leerobinson', avatarUrl: 'https://avatars.githubusercontent.com/u/3248537?v=4', contributions: 64 },
    ],
    envExample: `# Application
NODE_ENV="development"
PORT=3000
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database (Prisma + Supabase / PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/hyperdrive?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/hyperdrive?schema=public"

# Auth & Security
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# AI Provider API Keys
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"

# Redis Cache & WebSockets
REDIS_URL="redis://localhost:6379"
`,
};
