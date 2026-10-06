import type { RepoData, AnalysisResult, ReadmeTemplate, ProjectType, SectionCustomization } from '../types';
import { generateBadges, generateDeployBadges, generateLanguageBadges, generateTechBadge } from '../utils/badgeGenerator';

// ── Project type labels ────────────────────────────────────────────

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
    frontend: '🖥️ High-Performance Frontend Web Application',
    backend: '⚙️ Scalable Backend API & Microservice',
    fullstack: '🌐 Modern Fullstack Web Application',
    library: '📦 Reusable Developer Library / SDK',
    cli: '💻 High-Speed Terminal Command Line Interface (CLI)',
    unknown: '📁 Software Repository',
};

// ── Template configurations ────────────────────────────────────────

interface TemplateConfig {
    useEmojis: boolean;
    showBadges: boolean;
    showToc: boolean;
    showArchitecture: boolean;
    showMermaid: boolean;
    showContributors: boolean;
    showStarHistory: boolean;
    showDeployButtons: boolean;
    verbose: boolean;
    useAnimations: boolean;
    showStats: boolean;
    showFeedbackLinks: boolean;
    showRoadmap: boolean;
    showFaq: boolean;
    showAcknowledgments: boolean;
    style: 'cyber' | 'minimal' | 'executive' | 'vibrant';
}

const TEMPLATE_CONFIGS: Record<ReadmeTemplate, TemplateConfig> = {
    godtier: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showMermaid: true,
        showContributors: true,
        showStarHistory: true,
        showDeployButtons: true,
        verbose: true,
        useAnimations: true,
        showStats: true,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: true,
        style: 'cyber',
    },
    professional: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showMermaid: true,
        showContributors: true,
        showStarHistory: false,
        showDeployButtons: true,
        verbose: true,
        useAnimations: false,
        showStats: false,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: true,
        style: 'executive',
    },
    startup: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showMermaid: true,
        showContributors: false,
        showStarHistory: true,
        showDeployButtons: true,
        verbose: true,
        useAnimations: true,
        showStats: false,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: false,
        style: 'vibrant',
    },
    opensource: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showMermaid: false,
        showContributors: true,
        showStarHistory: true,
        showDeployButtons: false,
        verbose: true,
        useAnimations: true,
        showStats: true,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: true,
        style: 'vibrant',
    },
    minimal: {
        useEmojis: false,
        showBadges: true,
        showToc: false,
        showArchitecture: true,
        showMermaid: false,
        showContributors: false,
        showStarHistory: false,
        showDeployButtons: false,
        verbose: false,
        useAnimations: false,
        showStats: false,
        showFeedbackLinks: false,
        showRoadmap: false,
        showFaq: false,
        showAcknowledgments: false,
        style: 'minimal',
    },
    cyberpunk: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showMermaid: true,
        showContributors: true,
        showStarHistory: true,
        showDeployButtons: true,
        verbose: true,
        useAnimations: true,
        showStats: true,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: true,
        style: 'cyber',
    },
};

// ── Section builders ───────────────────────────────────────────────

function heading(text: string, emoji: string, useEmojis: boolean): string {
    return useEmojis ? `## ${emoji} ${text}` : `## ${text}`;
}

function divider(): string {
    return `\n<p align="center">\n  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" alt="divider" width="100%" />\n</p>\n`;
}

function buildTitle(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];

    lines.push('<div align="center">');
    lines.push('');

    // Dynamic banner or typing animation
    if (config.useAnimations) {
        const descText = repo.description
            ? encodeURIComponent(repo.description.slice(0, 75))
            : 'Next-Generation%20Application%20Platform';
        lines.push(`  <a href="${repo.homepage || `https://github.com/${repo.owner}/${repo.repo}`}">`);
        lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=38&pause=1200&color=00FF66&center=true&vCenter=true&width=840&height=105&lines=${encodeURIComponent(repo.name).toUpperCase()};${descText}" alt="Header Typing SVG" />`);
        lines.push(`  </a>`);
        lines.push('');
    } else {
        lines.push(`  <h1><b>${repo.name.toUpperCase()}</b></h1>`);
        lines.push('');
    }

    if (repo.description) {
        lines.push(`  <p align="center">`);
        lines.push(`    <strong>🚀 ${repo.description}</strong>`);
        lines.push(`  </p>`);
        lines.push('');
    }

    // Quick Action Bar
    const liveUrl = repo.homepage || `https://github.com/${repo.owner}/${repo.repo}`;
    lines.push(`  <p align="center">`);
    lines.push(`    <a href="${liveUrl}"><b>🌐 Live Demo</b></a> •`);
    lines.push(`    <a href="https://github.com/${repo.owner}/${repo.repo}#documentation"><b>📖 Docs</b></a> •`);
    lines.push(`    <a href="https://github.com/${repo.owner}/${repo.repo}/issues/new?template=bug_report.md"><b>🐛 Report Bug</b></a> •`);
    lines.push(`    <a href="https://github.com/${repo.owner}/${repo.repo}/issues/new?template=feature_request.md"><b>✨ Request Feature</b></a>`);
    lines.push(`  </p>`);
    lines.push('');

    if (config.showBadges) {
        lines.push(generateBadges(repo.owner, repo.repo));
        lines.push('');
    }

    const langBadges = generateLanguageBadges(repo.languages);
    if (langBadges) {
        lines.push(langBadges);
        lines.push('');
    }

    lines.push(`</div>`);
    lines.push('');
    lines.push(divider());
    lines.push('');

    return lines.join('\n');
}

function buildToc(sections: string[]): string {
    const lines: string[] = ['## 📑 Table of Contents', ''];
    for (const section of sections) {
        const anchor = section
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-');
        lines.push(`- [${section}](#${anchor})`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
    return lines.join('\n');
}

function buildOverview(repo: RepoData, analysis: AnalysisResult, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Overview', '🎯', config.useEmojis));
    lines.push('');

    const typeLabel = PROJECT_TYPE_LABELS[analysis.projectType];
    lines.push(`> [!NOTE]`);
    lines.push(`> **${repo.name}** is engineered as a **${typeLabel.toLowerCase()}**, delivering top-tier performance, developer ergonomity, and modern industry standards.`);
    lines.push('');

    if (repo.description) {
        lines.push(repo.description);
        lines.push('');
    }

    if (repo.topics.length > 0) {
        lines.push(`### 🏷️ Key Domains & Tags`);
        lines.push('');
        lines.push(repo.topics.map((t) => `\`#${t}\``).join('  '));
        lines.push('');
    }

    return lines.join('\n');
}

function buildFeatures(analysis: AnalysisResult, config: TemplateConfig): string {
    const features: { name: string; desc: string; status: string; tag: string }[] = [];

    if (analysis.techStack.length > 0) {
        features.push({
            name: 'Modern Architecture',
            desc: `Engineered using ${analysis.techStack.slice(0, 4).map((t) => `**${t.name}**`).join(', ')} for supreme reactivity and speed.`,
            status: '✅ Production Ready',
            tag: 'Core',
        });
    }
    if (analysis.databases.length > 0) {
        features.push({
            name: 'Enterprise Persistence Layer',
            desc: `Integrated data persistence with ${analysis.databases.map((d) => d.name).join(', ')}, delivering high concurrency and query optimization.`,
            status: '✅ Active',
            tag: 'Database',
        });
    }
    if (analysis.authLibs.length > 0) {
        features.push({
            name: 'Hardened Security & Authentication',
            desc: `Secure identity verification and session handling powered by ${analysis.authLibs.map((a) => a.name).join(', ')}.`,
            status: '✅ Hardened',
            tag: 'Security',
        });
    }
    if (analysis.realtimeLibs.length > 0) {
        features.push({
            name: 'Instantaneous Realtime Engine',
            desc: `Bidirectional synchronization and event streaming through ${analysis.realtimeLibs.map((r) => r.name).join(', ')}.`,
            status: '⚡ Low Latency',
            tag: 'Realtime',
        });
    }
    if (analysis.hasTests) {
        features.push({
            name: 'Rigorous Test Automation',
            desc: 'Continuous automated regression coverage and strict quality gates across modules.',
            status: '🧪 Verified',
            tag: 'Quality',
        });
    }
    if (analysis.hasDocker) {
        features.push({
            name: 'Containerized Deployment',
            desc: 'Deterministic multi-stage Docker builds and reproducible container orchestrations.',
            status: '🐳 Ready',
            tag: 'DevOps',
        });
    }
    if (analysis.hasCi) {
        features.push({
            name: 'Continuous Integration & Delivery',
            desc: 'Automated GitHub Actions pipelines ensuring zero-downtime releases and lint checks.',
            status: '🚀 Automated',
            tag: 'CI/CD',
        });
    }

    if (features.length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('Feature Matrix', '✨', config.useEmojis));
    lines.push('');
    lines.push('| Capability | Description | Status | Tier |');
    lines.push('| :--- | :--- | :---: | :---: |');
    for (const f of features) {
        lines.push(`| **${f.name}** | ${f.desc} | \`${f.status}\` | \`${f.tag}\` |`);
    }
    lines.push('');
    return lines.join('\n');
}

function buildMermaidArchitecture(analysis: AnalysisResult, repo: RepoData): string {
    const lines: string[] = [];
    lines.push('### 🏗️ System Architecture Flow');
    lines.push('');
    lines.push('```mermaid');
    lines.push('graph TD');
    lines.push('    subgraph Client["🖥️ User & Browser Clients"]');
    lines.push('        A[Web Browser / Mobile App] -->|HTTPS / WSS| B[API Gateway / CDN]');
    lines.push('    end');

    if (analysis.projectType === 'fullstack' || analysis.projectType === 'frontend') {
        lines.push('    subgraph Frontend["⚡ Frontend Layer"]');
        lines.push('        B --> C[Page Router & SSR Components]');
        lines.push('        C --> D[Client State & Query Cache]');
        lines.push('    end');
    }

    lines.push(`    subgraph Backend["⚙️ ${repo.name} Core Engine"]`);
    lines.push('        B --> E[REST & WebSocket Handlers]');
    lines.push('        E --> F[Auth & Middleware Guards]');
    lines.push('        F --> G[Business Logic & Service Layer]');
    lines.push('    end');

    if (analysis.databases.length > 0) {
        const dbName = analysis.databases[0]?.name || 'Database';
        lines.push('    subgraph Data["💾 Persistence & Cache Layer"]');
        lines.push(`        G --> H[${dbName} Primary Storage]`);
        lines.push('        G --> I[Redis / In-Memory Cache]');
        lines.push('    end');
    }

    lines.push('```');
    lines.push('');
    return lines.join('\n');
}

function buildTechStack(analysis: AnalysisResult, repo: RepoData, config: TemplateConfig): string {
    const all = [
        ...analysis.techStack,
        ...analysis.databases,
        ...analysis.authLibs,
        ...analysis.realtimeLibs,
    ];

    if (all.length === 0 && Object.keys(repo.languages).length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('Technology Stack', '🛠️', config.useEmojis));
    lines.push('');

    // Languages distribution breakdown
    if (Object.keys(repo.languages).length > 0) {
        lines.push('#### 📊 Language Distribution');
        lines.push('');
        const totalBytes = Object.values(repo.languages).reduce((a, b) => a + b, 0);
        const langRows = Object.entries(repo.languages)
            .map(([lang, bytes]) => {
                const pct = ((bytes / totalBytes) * 100).toFixed(1);
                return `**${lang}**: ${pct}%`;
            })
            .join(' • ');
        lines.push(`> ${langRows}`);
        lines.push('');
    }

    // Badges grouped by category
    const categories: Record<string, string[]> = {};
    for (const item of all) {
        const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item.name);
    }

    for (const [cat, items] of Object.entries(categories)) {
        lines.push(`**${cat} & Ecosystem:**`);
        lines.push('');
        lines.push(items.map((name) => generateTechBadge(name)).join(' '));
        lines.push('');
    }

    return lines.join('\n');
}

function buildArchitecture(analysis: AnalysisResult, config: TemplateConfig, repo: RepoData): string {
    if (!config.showArchitecture) return '';

    const lines: string[] = [];
    lines.push(heading('Project Structure', '📁', config.useEmojis));
    lines.push('');

    if (config.showMermaid) {
        lines.push(buildMermaidArchitecture(analysis, repo));
    }

    if (analysis.folderTree) {
        lines.push('#### 📂 Repository Directory Layout');
        lines.push('');
        lines.push('<details open>');
        lines.push('<summary><b>🔍 Click to Inspect Directory Tree</b></summary>');
        lines.push('<br>');
        lines.push('');
        lines.push('```bash');
        lines.push(analysis.folderTree);
        lines.push('```');
        lines.push('');
        lines.push('</details>');
        lines.push('');

        // Directory Annotations Table
        lines.push('| Directory | Purpose & Responsibility |');
        lines.push('| :--- | :--- |');
        lines.push('| `src/app` / `src/pages` | Route declarations, entry pages, and HTTP layout hierarchy |');
        lines.push('| `src/components` | Reusable UI design system atoms, molecules, and organisms |');
        lines.push('| `src/services` / `src/lib` | Core business logic singletons, utilities, and API wrappers |');
        lines.push('| `src/types` | Strict TypeScript interface definitions and data contracts |');
        if (analysis.hasTests) {
            lines.push('| `tests` / `__tests__` | Comprehensive unit, mock integration, and E2E specifications |');
        }
        lines.push('');
    }

    return lines.join('\n');
}

function buildInstallation(repo: RepoData, analysis: AnalysisResult, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Getting Started & Quickstart', '🚀', config.useEmojis));
    lines.push('');

    lines.push('### 📦 Prerequisites');
    lines.push('');
    lines.push('Ensure you have the following toolchains installed locally:');
    lines.push('');
    lines.push('- **[Node.js](https://nodejs.org/)** (v18.17.0 or higher recommended)');
    lines.push('- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`');
    if (analysis.hasDocker) {
        lines.push('- **[Docker Desktop](https://www.docker.com/)** (optional, for containerized run)');
    }
    const langs = Object.keys(repo.languages);
    if (langs.includes('Python')) lines.push('- **[Python](https://www.python.org/)** 3.10+');
    if (langs.includes('Go')) lines.push('- **[Go](https://golang.org/)** 1.21+');
    if (langs.includes('Rust')) lines.push('- **[Rust](https://www.rust-lang.org/)** stable');

    lines.push('');
    lines.push('### 💻 Step-by-Step Installation');
    lines.push('');
    lines.push('1. **Clone the Repository**');
    lines.push('```bash');
    lines.push(`git clone https://github.com/${repo.owner}/${repo.repo}.git`);
    lines.push(`cd ${repo.repo}`);
    lines.push('```');
    lines.push('');

    lines.push('2. **Install Project Dependencies**');
    lines.push('```bash');
    lines.push('# Using npm');
    lines.push('npm install');
    lines.push('');
    lines.push('# Or using pnpm / bun');
    lines.push('pnpm install # or bun install');
    lines.push('```');
    lines.push('');

    if (repo.envExample || analysis.hasEnvFile) {
        lines.push('3. **Configure Environment Settings**');
        lines.push('```bash');
        lines.push('cp .env.example .env');
        lines.push('```');
        lines.push('');
    }

    if (analysis.scripts['db:migrate'] || analysis.databases.length > 0) {
        lines.push('4. **Run Database Migrations** (if applicable)');
        lines.push('```bash');
        lines.push('npx prisma migrate dev # or npm run db:migrate');
        lines.push('```');
        lines.push('');
    }

    lines.push('5. **Launch the Development Server**');
    lines.push('```bash');
    lines.push('npm run dev');
    lines.push('```');
    lines.push('');
    lines.push('Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.');
    lines.push('');

    if (analysis.hasDocker) {
        lines.push('### 🐳 Docker Quickstart');
        lines.push('');
        lines.push('Run the entire stack in isolated Docker containers:');
        lines.push('```bash');
        lines.push('docker compose up --build -d');
        lines.push('```');
        lines.push('');
    }

    return lines.join('\n');
}

function buildUsage(analysis: AnalysisResult, config: TemplateConfig): string {
    const scripts = analysis.scripts;
    const entries = Object.entries(scripts);

    if (entries.length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('CLI & Script Commands', '💻', config.useEmojis));
    lines.push('');
    lines.push('| Command | Action | Implementation |');
    lines.push('| :--- | :--- | :--- |');

    const cmdDesc: Record<string, string> = {
        dev: 'Starts the live development server with HMR',
        build: 'Compiles and optimizes bundle for production',
        start: 'Spins up the optimized production server',
        lint: 'Performs static code analysis and linting',
        test: 'Executes the automated unit test suite',
        'test:e2e': 'Runs Playwright/Cypress end-to-end browser tests',
        preview: 'Locally inspects the production build artifact',
        'db:migrate': 'Applies pending database schema migrations',
        'db:seed': 'Populates local database with fixture records',
        format: 'Formats code according to Prettier standards',
    };

    for (const [scriptName, scriptCmd] of entries) {
        const desc = cmdDesc[scriptName] || `Runs \`${scriptName}\` script`;
        lines.push(`| \`npm run ${scriptName}\` | ${desc} | \`${scriptCmd}\` |`);
    }

    lines.push('');
    return lines.join('\n');
}

function buildEnvVars(repo: RepoData, config: TemplateConfig): string {
    if (!repo.envExample) return '';

    const lines: string[] = [];
    lines.push(heading('Environment Variables', '⚙️', config.useEmojis));
    lines.push('');
    lines.push('Create a `.env` file in the project root with the following variables:');
    lines.push('');
    lines.push('```bash');
    lines.push(repo.envExample);
    lines.push('```');
    lines.push('');

    // Parse variables into a neat table
    const varMatches = repo.envExample.match(/^[A-Z0-9_]+/gm);
    if (varMatches && varMatches.length > 0) {
        lines.push('| Variable Key | Status | Description |');
        lines.push('| :--- | :---: | :--- |');
        for (const v of varMatches) {
            lines.push(`| \`${v}\` | \`Required\` | Configuration parameter for ${v.toLowerCase().replace(/_/g, ' ')} |`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

function buildApiEndpoints(analysis: AnalysisResult, config: TemplateConfig): string {
    if (!analysis.hasApiEndpoints && analysis.projectType !== 'backend' && analysis.projectType !== 'fullstack') {
        return '';
    }

    const lines: string[] = [];
    lines.push(heading('API Specification & Endpoints', '🔌', config.useEmojis));
    lines.push('');
    lines.push('| Method | Route Endpoint | Purpose | Auth Required |');
    lines.push('| :---: | :--- | :--- | :---: |');
    lines.push('| `GET` | `/api/health` | Healthcheck and readiness probe | `No` |');
    lines.push('| `GET` | `/api/v1/resource` | Query and retrieve paginated list of resources | `Optional` |');
    lines.push('| `POST` | `/api/v1/resource` | Create a new entity with schema validation | `Bearer Token` |');
    lines.push('| `GET` | `/api/v1/resource/:id` | Fetch detailed entity record by unique ID | `No` |');
    lines.push('| `PATCH` | `/api/v1/resource/:id` | Update entity fields partially | `Bearer Token` |');
    lines.push('| `DELETE`| `/api/v1/resource/:id` | Purge or soft-delete entity | `Admin Only` |');
    lines.push('');
    lines.push('> [!TIP]');
    lines.push('> For comprehensive OpenAPI / Swagger specifications, refer to the `/docs` route or source controllers.');
    lines.push('');
    return lines.join('\n');
}

function buildDeployButtons(repo: RepoData, config: TemplateConfig): string {
    if (!config.showDeployButtons) return '';
    const repoUrl = `https://github.com/${repo.owner}/${repo.repo}`;

    const lines: string[] = [];
    lines.push(heading('One-Click Deployment', '🚀', config.useEmojis));
    lines.push('');
    lines.push('Easily deploy this application to your preferred cloud provider:');
    lines.push('');
    lines.push(generateDeployBadges(repoUrl));
    lines.push('');
    return lines.join('\n');
}

function buildStarHistory(repo: RepoData, config: TemplateConfig): string {
    if (!config.showStarHistory) return '';

    const lines: string[] = [];
    lines.push(heading('Star History & Community Growth', '📈', config.useEmojis));
    lines.push('');
    lines.push('<div align="center">');
    lines.push(`  <a href="https://star-history.com/#${repo.owner}/${repo.repo}&Date">`);
    lines.push(`    <picture>`);
    lines.push(`      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=${repo.owner}/${repo.repo}&type=Date&theme=dark" />`);
    lines.push(`      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=${repo.owner}/${repo.repo}&type=Date" />`);
    lines.push(`      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=${repo.owner}/${repo.repo}&type=Date" width="750" />`);
    lines.push(`    </picture>`);
    lines.push(`  </a>`);
    lines.push('</div>');
    lines.push('');
    return lines.join('\n');
}

function buildContributing(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Contributing Guidelines', '🤝', config.useEmojis));
    lines.push('');
    lines.push('We welcome pull requests and community collaboration! To contribute:');
    lines.push('');
    lines.push('1. **Fork** this repository.');
    lines.push(`2. **Create** your feature branch (\`git checkout -b feat/amazing-feature\`).`);
    lines.push(`3. **Commit** your changes following [Conventional Commits](https://www.conventionalcommits.org/):`);
    lines.push('   - `feat: add new streaming endpoint`');
    lines.push('   - `fix: resolve race condition in cache invalidation`');
    lines.push('   - `docs: update deployment troubleshooting guide`');
    lines.push(`4. **Push** to the branch (\`git push origin feat/amazing-feature\`).`);
    lines.push(`5. **Submit** a Pull Request against the \`${repo.defaultBranch || 'main'}\` branch.`);
    lines.push('');

    if (config.showContributors) {
        lines.push('### 🏆 Hall of Contributors');
        lines.push('');
        lines.push(`<a href="https://github.com/${repo.owner}/${repo.repo}/graphs/contributors">`);
        lines.push(`  <img src="https://contrib.rocks/image?repo=${repo.owner}/${repo.repo}" alt="Contributors Grid" />`);
        lines.push(`</a>`);
        lines.push('');
    }

    return lines.join('\n');
}

function buildRoadmap(config: TemplateConfig): string {
    if (!config.showRoadmap) return '';
    const lines: string[] = [];
    lines.push(heading('Roadmap & Upcoming Milestones', '🗺️', config.useEmojis));
    lines.push('');
    lines.push('- [x] **v1.0**: Core Architecture, High-Speed Routing & Baseline APIs');
    lines.push('- [x] **v1.5**: Full Automated Test Suite & CI/CD Pipelines');
    lines.push('- [ ] **v2.0**: Multi-Tenant Isolation & Distributed Sharding');
    lines.push('- [ ] **v2.5**: Native Mobile SDKs (iOS & Android bindings)');
    lines.push('');
    return lines.join('\n');
}

function buildFaq(config: TemplateConfig): string {
    if (!config.showFaq) return '';
    const lines: string[] = [];
    lines.push(heading('Frequently Asked Questions (FAQ)', '❓', config.useEmojis));
    lines.push('');
    lines.push('<details>');
    lines.push('  <summary><b>Q: How do I resolve port collisions when starting locally?</b></summary>');
    lines.push('  <br/>');
    lines.push('  Pass a different port variable in your environment, e.g. `PORT=3001 npm run dev`.');
    lines.push('</details>');
    lines.push('');
    lines.push('<details>');
    lines.push('  <summary><b>Q: Can I deploy this application into an air-gapped enterprise network?</b></summary>');
    lines.push('  <br/>');
    lines.push('  Yes! The Docker container builds self-contained artifacts without relying on external CDNs at runtime.');
    lines.push('</details>');
    lines.push('');
    lines.push('<details>');
    lines.push('  <summary><b>Q: How do I run only unit tests during CI?</b></summary>');
    lines.push('  <br/>');
    lines.push('  Execute `npm run test -- --run` to execute tests in single-run mode without watch polling.');
    lines.push('</details>');
    lines.push('');
    return lines.join('\n');
}

function buildLicense(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('License', '📄', config.useEmojis));
    lines.push('');
    if (repo.license) {
        lines.push(`Distributed under the **${repo.license}** License. See [\`LICENSE\`](LICENSE) for terms.`);
    } else {
        lines.push('This software is distributed under the **MIT** License. See [`LICENSE`](LICENSE) for details.');
    }
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(`<p align="center">Crafted with precision by <a href="https://github.com/${repo.owner}"><b>@${repo.owner}</b></a> and contributors.</p>`);
    lines.push('');
    return lines.join('\n');
}

// ── Main generator ─────────────────────────────────────────────────

export function generateReadme(
    repo: RepoData,
    analysis: AnalysisResult,
    template: ReadmeTemplate,
    customSections?: Partial<SectionCustomization>
): string {
    const config = { ...TEMPLATE_CONFIGS[template] };

    // Apply custom overrides if provided
    if (customSections) {
        if (customSections.showBadges !== undefined) config.showBadges = customSections.showBadges;
        if (customSections.showArchitecture !== undefined) config.showArchitecture = customSections.showArchitecture;
        if (customSections.showMermaid !== undefined) config.showMermaid = customSections.showMermaid;
        if (customSections.showContributors !== undefined) config.showContributors = customSections.showContributors;
        if (customSections.showStarHistory !== undefined) config.showStarHistory = customSections.showStarHistory;
        if (customSections.showDeployButtons !== undefined) config.showDeployButtons = customSections.showDeployButtons;
        if (customSections.showRoadmap !== undefined) config.showRoadmap = customSections.showRoadmap;
        if (customSections.showFaq !== undefined) config.showFaq = customSections.showFaq;
    }

    const sections: string[] = [];

    // Build each piece
    const title = buildTitle(repo, config);
    const overview = buildOverview(repo, analysis, config);
    const features = (customSections?.showFeatures ?? true) ? buildFeatures(analysis, config) : '';
    const techStack = (customSections?.showTechStack ?? true) ? buildTechStack(analysis, repo, config) : '';
    const architecture = config.showArchitecture ? buildArchitecture(analysis, config, repo) : '';
    const installation = (customSections?.showInstall ?? true) ? buildInstallation(repo, analysis, config) : '';
    const usage = (customSections?.showUsage ?? true) ? buildUsage(analysis, config) : '';
    const envVars = (customSections?.showEnv ?? true) ? buildEnvVars(repo, config) : '';
    const apiRef = (customSections?.showApi ?? true) ? buildApiEndpoints(analysis, config) : '';
    const deployButtons = buildDeployButtons(repo, config);
    const roadmap = buildRoadmap(config);
    const starHistory = buildStarHistory(repo, config);
    const contributing = buildContributing(repo, config);
    const faq = buildFaq(config);
    const license = (customSections?.showLicense ?? true) ? buildLicense(repo, config) : '';

    // Collect Table of Contents
    const tocSections: string[] = [];
    if (overview) tocSections.push('Overview');
    if (features) tocSections.push('Feature Matrix');
    if (techStack) tocSections.push('Technology Stack');
    if (architecture) tocSections.push('Project Structure');
    if (installation) tocSections.push('Getting Started & Quickstart');
    if (usage) tocSections.push('CLI & Script Commands');
    if (envVars) tocSections.push('Environment Variables');
    if (apiRef) tocSections.push('API Specification & Endpoints');
    if (deployButtons) tocSections.push('One-Click Deployment');
    if (roadmap) tocSections.push('Roadmap & Upcoming Milestones');
    if (starHistory) tocSections.push('Star History & Community Growth');
    tocSections.push('Contributing Guidelines');
    if (faq) tocSections.push('Frequently Asked Questions (FAQ)');
    if (license) tocSections.push('License');

    // Assemble document
    sections.push(title);
    if (config.showToc) sections.push(buildToc(tocSections));
    if (overview) sections.push(overview);
    if (features) sections.push(features);
    if (techStack) sections.push(techStack);
    if (architecture) sections.push(architecture);
    if (installation) sections.push(installation);
    if (usage) sections.push(usage);
    if (envVars) sections.push(envVars);
    if (apiRef) sections.push(apiRef);
    if (deployButtons) sections.push(deployButtons);
    if (roadmap) sections.push(roadmap);
    if (starHistory) sections.push(starHistory);
    sections.push(contributing);
    if (faq) sections.push(faq);
    if (license) sections.push(license);

    return sections
        .join('\n\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim() + '\n';
}
