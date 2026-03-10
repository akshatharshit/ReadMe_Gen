import type { RepoData, AnalysisResult, ProjectType, DependencyInfo } from '../types';
import {
    detectFrameworks,
    detectDatabases,
    detectAuth,
    detectRealtime,
    detectTesting,
    getDepPurpose,
} from '../utils/dependencyDetector';
import { buildTree } from '../utils/treeBuilder';

// ── Merge all deps from package.json ───────────────────────────────

//getting all the dependencies from the package.json
function getAllDeps(data: RepoData): Record<string, string> {
    const pkg = data.packageJson;
    if (!pkg) return {};
    return {
        ...(pkg.dependencies ?? {}),
        ...(pkg.devDependencies ?? {}),
        ...(pkg.peerDependencies ?? {}),
    };
}

// ── Detect project type ────────────────────────────────────────────

function detectProjectType(data: RepoData, deps: Record<string, string>): ProjectType {
    const depKeys = Object.keys(deps);
    const hasFile = (name: string) =>
        data.contents.some((c) => c.name.toLowerCase() === name.toLowerCase());

    const isCli =
        depKeys.some((d) => ['commander', 'yargs', 'meow', 'inquirer', 'chalk', 'ora'].includes(d)) ||
        hasFile('bin');
    if (isCli) return 'cli';

    const hasFrontend = depKeys.some((d) =>
        ['react', 'react-dom', 'vue', '@angular/core', 'svelte', 'next', 'nuxt', 'gatsby'].includes(d)
    );
    const hasBackend = depKeys.some((d) =>
        ['express', 'fastify', 'koa', '@nestjs/core', 'hapi'].includes(d)
    );

    if (hasFrontend && hasBackend) return 'fullstack';
    if (hasBackend) return 'backend';
    if (hasFrontend) return 'frontend';

    // Library heuristic
    const isLibrary = data.packageJson?.name && !hasFrontend && !hasBackend;
    if (isLibrary && (hasFile('lib') || hasFile('dist') || hasFile('index.js') || hasFile('index.ts'))) {
        return 'library';
    }

    // Language-based fallback
    const langs = Object.keys(data.languages);
    if (langs.includes('Python') || langs.includes('Java') || langs.includes('Go') || langs.includes('Rust')) {
        return 'backend';
    }
    if (langs.includes('HTML') || langs.includes('CSS')) {
        return 'frontend';
    }

    return 'unknown';
}

// ── Extract key dependencies ───────────────────────────────────────

function extractKeyDeps(deps: Record<string, string>): DependencyInfo[] {
    const important: DependencyInfo[] = [];
    for (const [pkg] of Object.entries(deps)) {
        const purpose = getDepPurpose(pkg);
        if (purpose) {
            important.push({ name: pkg, purpose });
        }
    }
    return important.slice(0, 20); // cap at 20
}

// ── Check for patterns in file structure ───────────────────────────

function hasPattern(data: RepoData, names: string[]): boolean {
    return data.contents.some((c) =>
        names.some((n) => c.path.toLowerCase().includes(n.toLowerCase()))
    );
}

// ── Main analyzer ──────────────────────────────────────────────────

export function analyzeRepo(data: RepoData): AnalysisResult {
    const deps = getAllDeps(data);

    const techStack = detectFrameworks(deps);
    const databases = detectDatabases(deps);
    const authLibs = detectAuth(deps);
    const realtimeLibs = detectRealtime(deps);
    const testingLibs = detectTesting(deps);

    const projectType = detectProjectType(data, deps);
    const scripts = data.packageJson?.scripts ?? {};
    const keyDependencies = extractKeyDeps(deps);
    const folderTree = buildTree(data.contents);

    const hasEnvFile =
        data.envExample !== null ||
        data.contents.some((c) => c.name.startsWith('.env'));

    const hasApiEndpoints = hasPattern(data, ['routes', 'controllers', 'api', 'endpoints']);
    const hasTests = hasPattern(data, ['test', 'tests', '__tests__', 'spec', '.test.', '.spec.']) || testingLibs.length > 0;
    const hasDocker = data.contents.some(
        (c) => c.name === 'Dockerfile' || c.name === 'docker-compose.yml' || c.name === 'docker-compose.yaml'
    );
    const hasCi = data.contents.some(
        (c) => c.path.startsWith('.github/workflows') || c.name === '.travis.yml' || c.name === '.gitlab-ci.yml'
    );

    // Merge testing into techStack
    const fullStack = [...techStack, ...testingLibs];


    return {
        projectType,
        techStack: fullStack,
        databases,
        authLibs,
        realtimeLibs,
        scripts,
        keyDependencies,
        folderTree,
        hasEnvFile,
        hasApiEndpoints,
        hasTests,
        hasDocker,
        hasCi,
    };
}
