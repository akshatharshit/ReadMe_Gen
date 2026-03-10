import type { RepoData, AnalysisResult, ReadmeTemplate, ProjectType } from '../types';
import { generateBadges, generateLanguageBadges, generateTechBadge } from '../utils/badgeGenerator';

// ── Project type labels ────────────────────────────────────────────

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
    frontend: '🖥️ Frontend Application',
    backend: '⚙️ Backend API',
    fullstack: '🌐 Fullstack Application',
    library: '📦 Library / SDK',
    cli: '💻 CLI Tool',
    unknown: '📁 Project',
};

// ── Template configurations ────────────────────────────────────────

interface TemplateConfig {
    useEmojis: boolean;
    showBadges: boolean;
    showToc: boolean;
    showArchitecture: boolean;
    showContributors: boolean;
    verbose: boolean;
    useAnimations?: boolean;
    showStats?: boolean;
    showFeedbackLinks?: boolean;
    showRoadmap?: boolean;
    showFaq?: boolean;
    showAcknowledgments?: boolean;
}

const TEMPLATE_CONFIGS: Record<ReadmeTemplate, TemplateConfig> = {
    professional: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showContributors: true,
        verbose: true,
    },
    startup: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showContributors: true,
        verbose: true,
    },
    minimal: {
        useEmojis: false,
        showBadges: true,
        showToc: false,
        showArchitecture: true,
        showContributors: false,
        verbose: false,
    },
    opensource: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showContributors: true,
        verbose: true,
    },
    godtier: {
        useEmojis: true,
        showBadges: true,
        showToc: true,
        showArchitecture: true,
        showContributors: true,
        verbose: true,
        useAnimations: true,
        showStats: true,
        showFeedbackLinks: true,
        showRoadmap: true,
        showFaq: true,
        showAcknowledgments: true,
    },
};

// ── Section builders ───────────────────────────────────────────────


function heading(text: string, emoji: string, useEmojis: boolean): string {
    return useEmojis ? `## ${emoji} ${text}` : `## ${text}`;
}

function divider(): string {
    return `<br>\n<p align="center"><img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" alt="divider" width="100%" /></p>\n<br>`;
}

function buildTitle(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];

    lines.push('<div align="center">');
    lines.push('');

    // Dynamic banner using typing SVG for animations
    if (config.useAnimations) {
        // Fallback text is repo description
        const descText = repo.description ? encodeURIComponent(repo.description) : 'An awesome project!';
        lines.push(`  <a href="${repo.homepage || `https://github.com/${repo.owner}/${repo.repo}`}">`);
        lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=40&pause=1000&color=2ecc71&center=true&vCenter=true&width=800&height=100&lines=${encodeURIComponent(repo.name)};${descText}" alt="Typing SVG" />`);
        lines.push(`  </a>`);
        lines.push('');
    } else {
        lines.push(`# ${repo.name}`);
        lines.push('');
    }

    if (repo.description && !config.useAnimations) {
        lines.push(`<p align="center"><em>${repo.description}</em></p>`);
        lines.push('');
    }

    if (config.showBadges) {
        lines.push(generateBadges(repo.owner, repo.repo));
        lines.push('');
    }

    const langBadges = generateLanguageBadges(repo.languages);
    if (langBadges) {
        lines.push(langBadges);
        lines.push('');
    }

    if (repo.homepage) {
        lines.push(`### [🌐 Live Demo](${repo.homepage})`);
        lines.push('');
    }

    lines.push(`</div>`);
    lines.push('');
    lines.push(divider());
    lines.push('');

    return lines.join('\n');
}

function buildToc(sections: string[]): string {
    const lines: string[] = ['## 📋 Table of Contents', ''];
    for (const section of sections) {
        const anchor = section
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-');
        lines.push(`- [${section}](#${anchor})`);
    }
    lines.push('');
    return lines.join('\n');
}

function buildOverview(repo: RepoData, analysis: AnalysisResult, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Overview', '📖', config.useEmojis));
    lines.push('');

    const typeLabel = PROJECT_TYPE_LABELS[analysis.projectType];
    lines.push(`**${repo.name}** is a ${typeLabel.toLowerCase()}.`);
    lines.push('');

    if (repo.description && config.verbose) {
        lines.push(repo.description);
        lines.push('');
    }

    if (repo.topics.length > 0) {
        lines.push(`> ${repo.topics.map((t) => `\`${t}\``).join(' · ')}`);
        lines.push('');
    }

    return lines.join('\n');
}

function buildFeatures(analysis: AnalysisResult, config: TemplateConfig): string {
    const features: { name: string, desc: string }[] = [];

    if (analysis.techStack.length > 0) {
        features.push({ name: 'Modern Tech Stack', desc: `Built with ${analysis.techStack.map((t) => `**${t.name}**`).join(', ')}` });
    }
    if (analysis.databases.length > 0) {
        features.push({ name: 'Robust Database', desc: `${analysis.databases.map((d) => d.name).join(', ')} database integration` });
    }
    if (analysis.authLibs.length > 0) {
        features.push({ name: 'Secure Authentication', desc: `Authentication via ${analysis.authLibs.map((a) => a.name).join(', ')}` });
    }
    if (analysis.realtimeLibs.length > 0) {
        features.push({ name: 'Real-time Capabilities', desc: `Real-time features with ${analysis.realtimeLibs.map((r) => r.name).join(', ')}` });
    }
    if (analysis.hasTests) features.push({ name: 'Reliability', desc: 'Comprehensive test suite for robust code quality' });
    if (analysis.hasDocker) features.push({ name: 'Containerized', desc: 'Docker support for seamless local development and deployment' });
    if (analysis.hasCi) features.push({ name: 'Automated Workflows', desc: 'CI/CD pipeline configured for continuous integration' });

    if (features.length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('Features', '✨', config.useEmojis));
    lines.push('');
    lines.push('| Feature | Description |');
    lines.push('| :--- | :--- |');
    for (const f of features) {
        lines.push(`| ⚡ **${f.name}** | ${f.desc} |`);
    }
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
    lines.push(heading('Tech Stack', '🛠️', config.useEmojis));
    lines.push('');

    if (Object.keys(repo.languages).length > 0) {
        lines.push('**Languages:**');
        const totalBytes = Object.values(repo.languages).reduce((a, b) => a + b, 0);
        for (const [lang, bytes] of Object.entries(repo.languages)) {
            const pct = ((bytes / totalBytes) * 100).toFixed(1);
            lines.push(`- ${lang} — ${pct}%`);
        }
        lines.push('');
    }

    // Group by category and render as badges
    const categories: Record<string, string[]> = {};
    for (const item of all) {
        const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item.name);
    }

    for (const [cat, items] of Object.entries(categories)) {
        lines.push(`**${cat}:**`);
        lines.push('');
        lines.push(items.map((name) => generateTechBadge(name)).join(' '));
        lines.push('');
    }

    return lines.join('\n');
}

function buildArchitecture(analysis: AnalysisResult, config: TemplateConfig): string {
    if (!config.showArchitecture || !analysis.folderTree) return '';

    const lines: string[] = [];
    lines.push(heading('Project Structure', '🏗️', config.useEmojis));
    lines.push('');
    lines.push('<details>');
    lines.push('<summary><b>📁 Toggle Directory Tree</b></summary>');
    lines.push('<br>');
    lines.push('```bash');
    lines.push(analysis.folderTree);
    lines.push('```');
    lines.push('</details>');
    lines.push('');
    return lines.join('\n');
}

function buildInstallation(repo: RepoData, analysis: AnalysisResult, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Getting Started', '🚀', config.useEmojis));
    lines.push('');

    lines.push('### Prerequisites');
    lines.push('');

    if (repo.packageJson) {
        lines.push('- [Node.js](https://nodejs.org/) (v18 or higher recommended)');
        lines.push('- npm or yarn');
    }

    const langs = Object.keys(repo.languages);
    if (langs.includes('Python')) lines.push('- [Python](https://www.python.org/) 3.8+');
    if (langs.includes('Go')) lines.push('- [Go](https://golang.org/) 1.20+');
    if (langs.includes('Rust')) lines.push('- [Rust](https://www.rust-lang.org/) (latest stable)');
    if (langs.includes('Java')) lines.push('- [Java](https://www.java.com/) 17+');
    if (analysis.hasDocker) lines.push('- [Docker](https://www.docker.com/)');

    lines.push('');
    lines.push('### Installation');
    lines.push('');
    lines.push(`\`\`\`bash`);
    lines.push(`# Clone the repository`);
    lines.push(`git clone https://github.com/${repo.owner}/${repo.repo}.git`);
    lines.push('');
    lines.push(`# Navigate to project directory`);
    lines.push(`cd ${repo.repo}`);
    lines.push('');

    if (repo.packageJson) {
        lines.push(`# Install dependencies`);
        lines.push(`npm install`);
    }

    lines.push(`\`\`\``);
    lines.push('');

    return lines.join('\n');
}

function buildUsage(analysis: AnalysisResult, config: TemplateConfig): string {
    const scripts = analysis.scripts;
    const entries = Object.entries(scripts);

    if (entries.length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('Usage', '💻', config.useEmojis));
    lines.push('');

    const cmdMap: Record<string, string> = {
        dev: '🔧 Development server',
        start: '▶️ Start the application',
        build: '📦 Build for production',
        test: '🧪 Run tests',
        lint: '🔍 Run linter',
        format: '✨ Format code',
        preview: '👀 Preview production build',
        deploy: '🚀 Deploy',
        seed: '🌱 Seed database',
        migrate: '📊 Run migrations',
    };

    for (const [key, cmd] of entries) {
        const label = cmdMap[key] || key;
        lines.push(`**${label}**`);
        lines.push('```bash');
        lines.push(`npm run ${key}`);
        lines.push('```');
        if (config.verbose) lines.push(`> \`${cmd}\``);
        lines.push('');
    }

    return lines.join('\n');
}

function buildEnvVars(repo: RepoData, config: TemplateConfig): string {
    if (!repo.envExample) return '';

    const lines: string[] = [];
    lines.push(heading('Environment Variables', '⚙️', config.useEmojis));
    lines.push('');
    lines.push('Create a `.env` file in the root directory:');
    lines.push('');
    lines.push('```env');
    lines.push(repo.envExample);
    lines.push('```');
    lines.push('');
    return lines.join('\n');
}

function buildDependencyTable(analysis: AnalysisResult, config: TemplateConfig): string {
    if (analysis.keyDependencies.length === 0) return '';

    const lines: string[] = [];
    lines.push(heading('Key Dependencies', '📦', config.useEmojis));
    lines.push('');
    lines.push('| Package | Purpose |');
    lines.push('| ------- | ------- |');
    for (const dep of analysis.keyDependencies) {
        lines.push(`| \`${dep.name}\` | ${dep.purpose} |`);
    }
    lines.push('');
    return lines.join('\n');
}

function buildApiEndpoints(analysis: AnalysisResult, config: TemplateConfig): string {
    if (!analysis.hasApiEndpoints || analysis.projectType === 'frontend') return '';

    const lines: string[] = [];
    lines.push(heading('API Reference', '🔌', config.useEmojis));
    lines.push('');
    lines.push('<details>');
    lines.push('<summary><b>🔗 View API Details</b></summary>');
    lines.push('<br>');
    lines.push('> API endpoints are mapped and available in the `/routes` or `/controllers` directory.');
    lines.push('> Please refer to the source code for highly detailed endpoint documentation and request/response schemas.');
    lines.push('</details>');
    lines.push('');
    return lines.join('\n');
}

function buildContributing(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Contributing', '🤝', config.useEmojis));
    lines.push('');
    lines.push('Contributions are welcome! Here\'s how you can help:');
    lines.push('');
    lines.push('1. **Fork** the repository');
    lines.push(`2. **Create** a feature branch (\`git checkout -b feature/amazing-feature\`)`);
    lines.push(`3. **Commit** your changes (\`git commit -m 'Add amazing feature'\`)`);
    lines.push(`4. **Push** to the branch (\`git push origin feature/amazing-feature\`)`);
    lines.push(`5. **Open** a Pull Request`);
    lines.push('');

    if (config.showContributors) {
        if (config.useAnimations) {
            lines.push('### Contributors');
            lines.push('');
            lines.push(`<a href="https://github.com/${repo.owner}/${repo.repo}/graphs/contributors">`);
            lines.push(`  <img src="https://contrib.rocks/image?repo=${repo.owner}/${repo.repo}" alt="Contributors" />`);
            lines.push(`</a>`);
            lines.push('');
        } else if (repo.contributors.length > 0) {
            lines.push('### Contributors');
            lines.push('');
            lines.push('<table>');
            lines.push('<tr>');
            const top = repo.contributors.slice(0, 8);
            for (const c of top) {
                lines.push(
                    `<td align="center"><a href="https://github.com/${c.login}"><img src="${c.avatarUrl}" width="60" alt="${c.login}"/><br/><sub><b>${c.login}</b></sub></a></td>`
                );
            }
            lines.push('</tr>');
            lines.push('</table>');
            lines.push('');
        }
    }

    return lines.join('\n');
}

function buildLicense(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('License', '📄', config.useEmojis));
    lines.push('');
    if (repo.license) {
        lines.push(
            `This project is licensed under the **${repo.license}** License — see the [LICENSE](LICENSE) file for details.`
        );
    } else {
        lines.push('This project does not currently specify a license.');
    }
    lines.push('');
    return lines.join('\n');
}

function buildSupport(repo: RepoData, config: TemplateConfig): string {
    const lines: string[] = [];
    lines.push(heading('Support & Contact', '💬', config.useEmojis));
    lines.push('');
    lines.push(`If you found this project helpful, please consider giving it a ⭐ on [GitHub](https://github.com/${repo.owner}/${repo.repo})!`);
    lines.push('');
    lines.push('For support, business inquiries, or to report an issue, please open an issue in the repository or contact the maintainer.');
    lines.push('');
    lines.push(divider());
    lines.push('');
    lines.push(`<p align="center">Made with ❤️ by <a href="https://github.com/${repo.owner}"><b>@${repo.owner}</b></a></p>`);
    lines.push('');
    return lines.join('\n');
}

function buildStats(repo: RepoData, config: TemplateConfig): string {
    if (!config.showStats) return '';
    const lines: string[] = [];
    lines.push(heading('GitHub Stats', '📊', config.useEmojis));
    lines.push('');
    lines.push(`<div align="center">`);
    lines.push(`  <img src="https://github-readme-stats.vercel.app/api?username=${repo.owner}&repo=${repo.repo}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&text_color=c9d1d9&title_color=58a6ff" alt="GitHub Stats" />`);
    lines.push(`  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${repo.owner}&theme=radical&layout=compact&hide_border=true&bg_color=0D1117&text_color=c9d1d9&title_color=58a6ff" alt="Top Languages" />`);
    lines.push(`</div>`);
    lines.push('');
    return lines.join('\n');
}

function buildScreenshots(config: TemplateConfig): string {
    if (!config.useAnimations) return '';
    const lines: string[] = [];
    lines.push(heading('Screenshots', '📸', config.useEmojis));
    lines.push('');
    lines.push('> Add your screenshots here. The image below is a placeholder!');
    lines.push('');
    lines.push(`<div align="center">`);
    lines.push(`  <img src="https://via.placeholder.com/800x400.png?text=Project+Screenshot+or+GIF" alt="Project Screenshot" width="800" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />`);
    lines.push(`</div>`);
    lines.push('');
    return lines.join('\n');
}

function buildFeedbackLinks(repo: RepoData, config: TemplateConfig): string {
    if (!config.showFeedbackLinks) return '';
    const lines: string[] = [];
    lines.push(heading('Feedback & Issues', '🐛', config.useEmojis));
    lines.push('');
    lines.push(`Have feedback or found a bug? We'd love to hear from you!`);
    lines.push('');
    lines.push(`- [Report a Bug](https://github.com/${repo.owner}/${repo.repo}/issues/new?assignees=&labels=bug&template=bug_report.md&title=)`);
    lines.push(`- [Request a Feature](https://github.com/${repo.owner}/${repo.repo}/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)`);
    lines.push('');
    return lines.join('\n');
}

function buildRoadmap(config: TemplateConfig): string {
    if (!config.showRoadmap) return '';
    const lines: string[] = [];
    lines.push(heading('Roadmap', '🛣️', config.useEmojis));
    lines.push('');
    lines.push(`- [x] **Phase 1**: Initial Release & Core Features`);
    lines.push(`- [ ] **Phase 2**: Extended Functionality`);
    lines.push(`- [ ] **Phase 3**: Community Integrations & Ecosystem`);
    lines.push('');
    return lines.join('\n');
}

function buildFaq(config: TemplateConfig): string {
    if (!config.showFaq) return '';
    const lines: string[] = [];
    lines.push(heading('FAQ', '❓', config.useEmojis));
    lines.push('');
    lines.push(`<details>`);
    lines.push(`  <summary><b>Why should I use this project?</b></summary>`);
    lines.push(`  <br/>`);
    lines.push(`  Because it's awesome and will save you tons of time!`);
    lines.push(`</details>`);
    lines.push('');
    lines.push(`<details>`);
    lines.push(`  <summary><b>How do I contribute?</b></summary>`);
    lines.push(`  <br/>`);
    lines.push(`  Check out the <a href="#contributing">Contributing</a> section for details.`);
    lines.push(`</details>`);
    lines.push('');
    return lines.join('\n');
}

function buildAcknowledgments(config: TemplateConfig): string {
    if (!config.showAcknowledgments) return '';
    const lines: string[] = [];
    lines.push(heading('Acknowledgments', '🎉', config.useEmojis));
    lines.push('');
    lines.push(`- [Awesome Project](https://github.com/awesome/project)`);
    lines.push(`- [Cool Resource](https://example.com)`);
    lines.push('');
    return lines.join('\n');
}

// ── Main generator ─────────────────────────────────────────────────

export function generateReadme(
    repo: RepoData,
    analysis: AnalysisResult,
    template: ReadmeTemplate
): string {
    const config = TEMPLATE_CONFIGS[template];
    const sections: string[] = [];

    // Build all section strings
    const title = buildTitle(repo, config);
    const stats = buildStats(repo, config);
    const overview = buildOverview(repo, analysis, config);
    const screenshots = buildScreenshots(config);
    const features = buildFeatures(analysis, config);
    const techStack = buildTechStack(analysis, repo, config);
    const architecture = buildArchitecture(analysis, config);
    const installation = buildInstallation(repo, analysis, config);
    const usage = buildUsage(analysis, config);
    const envVars = buildEnvVars(repo, config);
    const depTable = buildDependencyTable(analysis, config);
    const apiRef = buildApiEndpoints(analysis, config);
    const roadmap = buildRoadmap(config);
    const contributing = buildContributing(repo, config);
    const feedback = buildFeedbackLinks(repo, config);
    const faq = buildFaq(config);
    const license = buildLicense(repo, config);
    const acknowledgments = buildAcknowledgments(config);
    const support = buildSupport(repo, config);

    // Collect section names for TOC
    const tocSections: string[] = [];
    if (stats) tocSections.push('GitHub Stats');
    if (overview) tocSections.push('Overview');
    if (screenshots) tocSections.push('Screenshots');
    if (features) tocSections.push('Features');
    if (techStack) tocSections.push('Tech Stack');
    if (architecture) tocSections.push('Project Structure');
    if (installation) tocSections.push('Getting Started');
    if (usage) tocSections.push('Usage');
    if (envVars) tocSections.push('Environment Variables');
    if (depTable) tocSections.push('Key Dependencies');
    if (apiRef) tocSections.push('API Reference');
    if (roadmap) tocSections.push('Roadmap');
    tocSections.push('Contributing');
    if (feedback) tocSections.push('Feedback & Issues');
    if (faq) tocSections.push('FAQ');
    tocSections.push('License');
    if (acknowledgments) tocSections.push('Acknowledgments');
    tocSections.push('Support');

    // Assemble
    sections.push(title);
    if (stats) sections.push(stats);
    if (config.showToc) sections.push(buildToc(tocSections));
    if (overview) sections.push(overview);
    if (screenshots) sections.push(screenshots);
    if (features) sections.push(features);
    if (techStack) sections.push(techStack);
    if (architecture) sections.push(architecture);
    if (installation) sections.push(installation);
    if (usage) sections.push(usage);
    if (envVars) sections.push(envVars);
    if (depTable) sections.push(depTable);
    if (apiRef) sections.push(apiRef);
    if (roadmap) sections.push(roadmap);
    sections.push(contributing);
    if (feedback) sections.push(feedback);
    if (faq) sections.push(faq);
    sections.push(license);
    if (acknowledgments) sections.push(acknowledgments);
    sections.push(support);

    // Post-process: remove double blank lines
    return sections
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
        + '\n';
}
