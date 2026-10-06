import type { TechItem } from '../types';

// ── Framework detection ────────────────────────────────────────────

const FRAMEWORK_MAP: Record<string, string> = {
    react: 'React',
    'react-dom': 'React',
    next: 'Next.js',
    nuxt: 'Nuxt.js',
    vue: 'Vue.js',
    angular: 'Angular',
    '@angular/core': 'Angular',
    svelte: 'Svelte',
    '@sveltejs/kit': 'SvelteKit',
    vite: 'Vite',
    gatsby: 'Gatsby',
    remix: 'Remix',
    express: 'Express',
    fastify: 'Fastify',
    koa: 'Koa',
    nestjs: 'NestJS',
    '@nestjs/core': 'NestJS',
    hapi: 'Hapi',
    django: 'Django',
    flask: 'Flask',
    'tailwindcss': 'TailwindCSS',
    '@tailwindcss/vite': 'TailwindCSS',
    '@tailwindcss/postcss': 'TailwindCSS',
    typescript: 'TypeScript',
    webpack: 'Webpack',
    esbuild: 'esbuild',
    rollup: 'Rollup',
    parcel: 'Parcel',
    electron: 'Electron',
    'react-native': 'React Native',
    bun: 'Bun',
    'framer-motion': 'Framer Motion',
    'lucide-react': 'Lucide Icons',
};

// ── Database detection ─────────────────────────────────────────────

const DATABASE_MAP: Record<string, string> = {
    mongoose: 'MongoDB',
    mongodb: 'MongoDB',
    pg: 'PostgreSQL',
    mysql: 'MySQL',
    mysql2: 'MySQL',
    redis: 'Redis',
    ioredis: 'Redis',
    prisma: 'Prisma',
    '@prisma/client': 'Prisma',
    'drizzle-orm': 'Drizzle ORM',
    typeorm: 'TypeORM',
    sequelize: 'Sequelize',
    knex: 'Knex.js',
    sqlite3: 'SQLite',
    'better-sqlite3': 'SQLite',
    dynamodb: 'DynamoDB',
    '@aws-sdk/client-dynamodb': 'DynamoDB',
    firebase: 'Firebase',
    'firebase-admin': 'Firebase',
    supabase: 'Supabase',
    '@supabase/supabase-js': 'Supabase',
};

// ── Auth detection ─────────────────────────────────────────────────

const AUTH_MAP: Record<string, string> = {
    jsonwebtoken: 'JWT',
    passport: 'Passport.js',
    'passport-local': 'Passport.js',
    bcrypt: 'bcrypt',
    bcryptjs: 'bcrypt',
    'firebase-auth': 'Firebase Auth',
    auth0: 'Auth0',
    '@auth0/auth0-react': 'Auth0',
    'next-auth': 'NextAuth.js',
    '@clerk/clerk-sdk-node': 'Clerk',
    '@clerk/nextjs': 'Clerk',
    'express-session': 'Express Session',
};

// ── Realtime detection ─────────────────────────────────────────────

const REALTIME_MAP: Record<string, string> = {
    'socket.io': 'Socket.IO',
    'socket.io-client': 'Socket.IO',
    ws: 'WebSocket (ws)',
    pusher: 'Pusher',
    'pusher-js': 'Pusher',
    ably: 'Ably',
    '@centrifugo/centrifuge': 'Centrifugo',
    openai: 'OpenAI',
    '@anthropic-ai/sdk': 'Anthropic',
};

// ── Testing detection ──────────────────────────────────────────────

const TESTING_MAP: Record<string, string> = {
    jest: 'Jest',
    mocha: 'Mocha',
    vitest: 'Vitest',
    cypress: 'Cypress',
    playwright: 'Playwright',
    '@playwright/test': 'Playwright',
    '@testing-library/react': 'Testing Library',
    chai: 'Chai',
    supertest: 'Supertest',
};

// ── Dependency purpose descriptions ────────────────────────────────

const PURPOSE_MAP: Record<string, string> = {
    react: 'UI library for declarative interfaces',
    'react-dom': 'React DOM rendering engine',
    next: 'Production-ready React fullstack framework',
    vue: 'Progressive JavaScript UI framework',
    angular: 'Scalable frontend framework',
    express: 'Fast, unopinionated web framework for Node.js',
    fastify: 'Extremely fast and low overhead web framework',
    koa: 'Next generation web framework designed by Express team',
    '@nestjs/core': 'Enterprise TypeScript backend framework',
    mongoose: 'Elegant MongoDB object modeling for Node.js',
    pg: 'PostgreSQL client for Node.js',
    prisma: 'Next-generation TypeScript ORM & database toolkit',
    '@prisma/client': 'Type-safe database client generator',
    'drizzle-orm': 'TypeScript ORM with zero-overhead schemas',
    redis: 'High-performance in-memory cache & key-value store',
    'socket.io': 'Real-time bidirectional event-based communication',
    'socket.io-client': 'Client library for real-time WebSocket communication',
    jsonwebtoken: 'Compact and URL-safe JWT auth tokens',
    passport: 'Simple, unobtrusive authentication middleware',
    bcrypt: 'Cryptographic hash algorithm for password security',
    axios: 'Promise-based HTTP client for browser and Node.js',
    lodash: 'Modern JavaScript utility library',
    'date-fns': 'Modern JavaScript date utility library',
    dotenv: 'Loads environment variables from .env file',
    cors: 'Cross-Origin Resource Sharing middleware',
    helmet: 'Secures Express apps by setting HTTP response headers',
    morgan: 'HTTP request logger middleware',
    winston: 'Versatile and multi-transport logging library',
    pino: 'Ultra-fast, low-overhead JSON logger',
    zod: 'TypeScript-first schema declaration and data validation',
    multer: 'Middleware for handling multipart/form-data file uploads',
    sharp: 'High-performance Node.js image processing',
    graphql: 'Declarative query language for APIs',
    tailwindcss: 'Utility-first CSS framework for rapid UI styling',
    zustand: 'Small, fast, and scalable state-management solution',
    '@tanstack/react-query': 'Asynchronous state management and data fetching',
    'lucide-react': 'Clean, customizable SVG icon library',
    'framer-motion': 'Production-ready animation library for React',
    openai: 'Official Node.js SDK for OpenAI GPT models',
    '@anthropic-ai/sdk': 'Official client library for Anthropic Claude AI',
    vitest: 'Blazing fast Vite-native unit test runner',
    '@playwright/test': 'Cross-browser end-to-end automation testing suite',
};

function detect(
    deps: Record<string, string>,
    map: Record<string, string>,
    category: TechItem['category']
): TechItem[] {
    const found = new Map<string, TechItem>();
    for (const pkg of Object.keys(deps)) {
        const name = map[pkg];
        if (name && !found.has(name)) {
            found.set(name, { name, category });
        }
    }
    return Array.from(found.values());
}

export function detectFrameworks(deps: Record<string, string>): TechItem[] {
    return detect(deps, FRAMEWORK_MAP, 'framework');
}

export function detectDatabases(deps: Record<string, string>): TechItem[] {
    return detect(deps, DATABASE_MAP, 'database');
}

export function detectAuth(deps: Record<string, string>): TechItem[] {
    return detect(deps, AUTH_MAP, 'auth');
}

export function detectRealtime(deps: Record<string, string>): TechItem[] {
    return detect(deps, REALTIME_MAP, 'realtime');
}

export function detectTesting(deps: Record<string, string>): TechItem[] {
    return detect(deps, TESTING_MAP, 'testing');
}

export function getDepPurpose(pkg: string): string {
    return PURPOSE_MAP[pkg] || '';
}
