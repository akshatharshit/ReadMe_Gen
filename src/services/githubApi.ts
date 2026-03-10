import type { RepoData, RepoContent, PackageJson, Contributor } from '../types';

const API_BASE = 'https://api.github.com';

async function ghFetch<T>(path: string, token?: string): Promise<T> {
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
    };
    if (token) {
        headers.Authorization = `token ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, { headers });

    if (res.status === 404) throw new Error('Repository not found. Check the URL and try again.');
    if (res.status === 403) {
        const remaining = res.headers.get('x-ratelimit-remaining');
        if (remaining === '0') {
            const resetTime = res.headers.get('x-ratelimit-reset');
            const resetDate = resetTime ? new Date(Number(resetTime) * 1000).toLocaleTimeString() : 'soon';
            throw new Error(`GitHub API rate limit reached. Try again at ${resetDate}, or add a personal access token.`);
        }
        throw new Error('Access forbidden. The repository may be private.');
    }
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

    return res.json() as Promise<T>;
}

interface GHRepo {
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    license: { spdx_id: string } | null;
    topics: string[];
    default_branch: string;
    homepage: string | null;
    created_at: string;
    updated_at: string;
    owner: { login: string; avatar_url: string };
}

interface GHContent {
    name: string;
    path: string;
    type: 'file' | 'dir';
    size?: number;
}

interface GHContributor {
    login: string;
    avatar_url: string;
    contributions: number;
}

// ── Fetch individual file (base64 decoded) ─────────────────────────

export async function fetchFileContent(owner: string, repo: string, path: string, token?: string): Promise<string | null> {
    try {
        const data = await ghFetch<{ content: string; encoding: string }>(
            `/repos/${owner}/${repo}/contents/${path}`,
            token
        );
        if (data.encoding === 'base64') {
            return atob(data.content.replace(/\n/g, ''));
        }
        return data.content;
    } catch {
        return null;
    }
}

// ── Deep contents fetcher (breadth-first, depth-limited) ───────────

async function fetchContentsDeep(
    owner: string,
    repo: string,
    path = '',
    depth = 0,
    maxDepth = 4,
    token?: string
): Promise<RepoContent[]> {
    if (depth > maxDepth) return [];

    try {
        const items = await ghFetch<GHContent[]>(`/repos/${owner}/${repo}/contents/${path}`, token);
        let result: RepoContent[] = [];

        for (const item of items) {
            result.push({
                name: item.name,
                path: item.path,
                type: item.type,
                size: item.size,
            });

            if (item.type === 'dir' && depth < maxDepth) {
                const children = await fetchContentsDeep(owner, repo, item.path, depth + 1, maxDepth, token);
                result = result.concat(children);
            }
        }

        return result;
    } catch {
        return [];
    }
}

// ── Main fetch function ────────────────────────────────────────────

export async function fetchRepoData(owner: string, repo: string, token?: string): Promise<RepoData> {
    // Fire parallel requests
    const [repoInfo, languages, contents, contributors] = await Promise.all([
        ghFetch<GHRepo>(`/repos/${owner}/${repo}`, token),
        ghFetch<Record<string, number>>(`/repos/${owner}/${repo}/languages`, token),
        fetchContentsDeep(owner, repo, '', 0, 4, token),
        ghFetch<GHContributor[]>(`/repos/${owner}/${repo}/contributors?per_page=10`, token).catch(() => []),
    ]);

    // Fetch package.json if it exists
    let packageJson: PackageJson | null = null;
    const pkgContent = await fetchFileContent(owner, repo, 'package.json', token);
    if (pkgContent) {
        try {
            packageJson = JSON.parse(pkgContent);
        } catch {
            packageJson = null;
        }
    }

    // Check for README
    let hasReadme = false;
    try {
        await ghFetch(`/repos/${owner}/${repo}/readme`, token);
        hasReadme = true;
    } catch {
        hasReadme = false;
    }

    // Check for .env.example
    const envExample = await fetchFileContent(owner, repo, '.env.example', token);

    const mappedContributors: Contributor[] = (contributors || []).map((c) => ({
        login: c.login,
        avatarUrl: c.avatar_url,
        contributions: c.contributions,
    }));

    return {
        name: repoInfo.name,
        fullName: repoInfo.full_name,
        description: repoInfo.description,
        stars: repoInfo.stargazers_count,
        forks: repoInfo.forks_count,
        watchers: repoInfo.watchers_count,
        openIssues: repoInfo.open_issues_count,
        license: repoInfo.license?.spdx_id ?? null,
        topics: repoInfo.topics,
        defaultBranch: repoInfo.default_branch,
        homepage: repoInfo.homepage,
        createdAt: repoInfo.created_at,
        updatedAt: repoInfo.updated_at,
        owner,
        repo,
        avatarUrl: repoInfo.owner.avatar_url,
        languages,
        contents,
        packageJson,
        hasReadme,
        contributors: mappedContributors,
        envExample,
    };
}
