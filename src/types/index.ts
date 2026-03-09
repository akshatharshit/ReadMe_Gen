// ── GitHub API response types ──────────────────────────────────────

export interface RepoData {
    name: string;
    fullName: string;
    description: string | null;
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    license: string | null;
    topics: string[];
    defaultBranch: string;
    homepage: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string;
    repo: string;
    avatarUrl: string;
    languages: Record<string, number>;
    contents: RepoContent[];
    packageJson: PackageJson | null;
    hasReadme: boolean;
    contributors: Contributor[];
    envExample: string | null;
}

export interface RepoContent {
    name: string;
    path: string;
    type: 'file' | 'dir';
    size?: number;
}

export interface PackageJson {
    name?: string;
    version?: string;
    description?: string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}

export interface Contributor {
    login: string;
    avatarUrl: string;
    contributions: number;
}

// ── Analysis types ─────────────────────────────────────────────────

export type ProjectType =
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'library'
    | 'cli'
    | 'unknown';

export interface TechItem {
    name: string;
    category: 'framework' | 'database' | 'auth' | 'realtime' | 'tool' | 'testing' | 'other';
}

export interface DependencyInfo {
    name: string;
    purpose: string;
}

export interface AnalysisResult {
    projectType: ProjectType;
    techStack: TechItem[];
    databases: TechItem[];
    authLibs: TechItem[];
    realtimeLibs: TechItem[];
    scripts: Record<string, string>;
    keyDependencies: DependencyInfo[];
    folderTree: string;
    hasEnvFile: boolean;
    hasApiEndpoints: boolean;
    hasTests: boolean;
    hasDocker: boolean;
    hasCi: boolean;
}

// ── README template types ──────────────────────────────────────────

export type ReadmeTemplate = 'professional' | 'startup' | 'minimal' | 'opensource' | 'godtier';

// ── App state ──────────────────────────────────────────────────────

export interface AppState {
    repoUrl: string;
    repoData: RepoData | null;
    analysis: AnalysisResult | null;
    markdown: string;
    template: ReadmeTemplate;
    loading: boolean;
    loadingStep: string;
    error: string | null;
    pat: string | null;

    setUrl: (url: string) => void;
    setPat: (pat: string | null) => void;
    setMarkdown: (md: string) => void;
    setTemplate: (t: ReadmeTemplate) => void;
    setError: (err: string | null) => void;
    generate: () => Promise<void>;
    regenerate: () => Promise<void>;
    reset: () => void;
}
