import type { RepoContent } from '../types';

/**
 * Build an ASCII folder tree string from a flat list of repo contents.
 * Limits depth to keep output readable.
 */
export function buildTree(contents: RepoContent[], maxDepth = 3): string {
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

    // Render
    function render(node: TreeNode, prefix: string, isLast: boolean, isRoot: boolean): string[] {
        const lines: string[] = [];
        if (!isRoot) {
            const connector = isLast ? '└── ' : '├── ';
            const icon = node.isDir ? '📁 ' : '📄 ';
            lines.push(prefix + connector + icon + node.name);
        }

        const childEntries = Array.from(node.children.values());
        // Sort: dirs first
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
