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
    typescript: 'TypeScript',
    webpack: 'Webpack',
    esbuild: 'esbuild',
    rollup: 'Rollup',
    parcel: 'Parcel',
    electron: 'Electron',
    'react-native': 'React Native',
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
    react: 'UI library',
    'react-dom': 'React DOM rendering',
    next: 'React framework',
    vue: 'UI framework',
    angular: 'Frontend framework',
    express: 'Web framework',
    fastify: 'Web framework',
    koa: 'Web framework',
    '@nestjs/core': 'Backend framework',
    mongoose: 'MongoDB ODM',
    pg: 'PostgreSQL client',
    prisma: 'Database toolkit',
    '@prisma/client': 'Database client',
    redis: 'Redis client',
    'socket.io': 'Real-time communication',
    jsonwebtoken: 'JWT authentication',
    passport: 'Authentication middleware',
    bcrypt: 'Password hashing',
    axios: 'HTTP client',
    lodash: 'Utility library',
    moment: 'Date/time library',
    dayjs: 'Date/time library',
    'date-fns': 'Date utilities',
    dotenv: 'Environment variables',
    cors: 'CORS middleware',
    helmet: 'Security middleware',
    morgan: 'HTTP logger',
    winston: 'Logging library',
    pino: 'Logging library',
    zod: 'Schema validation',
    joi: 'Schema validation',
    yup: 'Schema validation',
    'class-validator': 'Validation library',
    multer: 'File upload middleware',
    sharp: 'Image processing',
    nodemailer: 'Email sending',
    'bull': 'Job queue',
    'bullmq': 'Job queue',
    swagger: 'API documentation',
    'swagger-ui-express': 'API documentation UI',
    graphql: 'GraphQL runtime',
    'apollo-server': 'GraphQL server',
    '@apollo/client': 'GraphQL client',
    tailwindcss: 'Utility-first CSS',
    sass: 'CSS preprocessor',
    'styled-components': 'CSS-in-JS',
    '@emotion/react': 'CSS-in-JS',
    zustand: 'State management',
    redux: 'State management',
    '@reduxjs/toolkit': 'State management',
    mobx: 'State management',
    'react-query': 'Data fetching',
    '@tanstack/react-query': 'Data fetching',
    swr: 'Data fetching',
    'react-router-dom': 'Client routing',
    'react-hook-form': 'Form handling',
    formik: 'Form handling',
    'framer-motion': 'Animations',
    three: '3D rendering',
    'd3': 'Data visualization',
    'chart.js': 'Charts',
    recharts: 'React charts',
};

// ── Detect helper ──────────────────────────────────────────────────

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

// ── Public API ─────────────────────────────────────────────────────

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
