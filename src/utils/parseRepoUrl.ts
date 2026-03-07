/**
 * Parse a GitHub repository URL into owner and repo name.
 * Supports:
 *   https://github.com/owner/repo
 *   https://github.com/owner/repo.git
 *   github.com/owner/repo
 *   owner/repo
 */
export function parseRepoUrl(input: string): { owner: string; repo: string } | null {
    const trimmed = input.trim().replace(/\/+$/, '').replace(/\.git$/, '');

    // Direct owner/repo format
    const shortMatch = trimmed.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
    if (shortMatch && !trimmed.includes('://') && !trimmed.includes('.com')) {
        return { owner: shortMatch[1], repo: shortMatch[2] };
    }

    // URL format
    const urlMatch = trimmed.match(
        /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/
    );
    if (urlMatch) {
        return { owner: urlMatch[1], repo: urlMatch[2] };
    }

    return null;
}
