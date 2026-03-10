import type { RepoContent } from '../types';

/**
 * Build a clean ASCII folder tree string from a flat list of repo contents.
 * Uses plain text connectors (├──, └──, │) for proper rendering inside
 * markdown code blocks. No emojis — they break monospace alignment.
 */
export function buildTree(contents: RepoContent[], maxDepth = 5): string {
    // Build a nested map
    interface TreeNode {
        name: string;
        children: Map<string, TreeNode>;
        isDir: boolean;
    }

    const root: TreeNode = { name: '', children: new Map(), isDir: true };

    // Sort: directories first, then alphabetical
    const sorted = [...contents].sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return a.name.localeCompare(b.name);
    });

    for (const item of sorted) {
        const parts = item.path.split('/');
        if (parts.length > maxDepth) continue;

        let current = root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current.children.has(part)) {
                current.children.set(part, {
                    name: part,
                    children: new Map(),
                    isDir: i < parts.length - 1 || item.type === 'dir',
                });
            }
            current = current.children.get(part)!;
        }
    }

    // Render as clean ASCII tree
    function render(node: TreeNode, prefix: string, isLast: boolean, isRoot: boolean): string[] {
        const lines: string[] = [];

        if (isRoot) {
            lines.push('.');
        } else {
            const connector = isLast ? '└── ' : '├── ';
            const suffix = node.isDir ? '/' : '';
            lines.push(prefix + connector + node.name + suffix);
        }

        const childEntries = Array.from(node.children.values());
        // Sort: dirs first, then alphabetical
        childEntries.sort((a, b) => {
            if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        for (let i = 0; i < childEntries.length; i++) {
            const child = childEntries[i];
            const childIsLast = i === childEntries.length - 1;
            const newPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ');
            lines.push(...render(child, newPrefix, childIsLast, false));
        }

        return lines;
    }

    return render(root, '', true, true).join('\n');
}
