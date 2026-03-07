import { create } from 'zustand';
import type { AppState, ReadmeTemplate } from '../types';
import { parseRepoUrl } from '../utils/parseRepoUrl';
import { fetchRepoData } from '../services/githubApi';
import { analyzeRepo } from '../services/repoAnalyzer';
import { generateReadme } from '../services/readmeGenerator';

export const useReadmeStore = create<AppState>((set, get) => ({
    repoUrl: '',
    repoData: null,
    analysis: null,
    markdown: '',
    template: 'professional' as ReadmeTemplate,
    loading: false,
    loadingStep: '',
    error: null,
    pat: null,

    setUrl: (url) => set({ repoUrl: url, error: null }),
    setPat: (pat) => set({ pat }),

    setMarkdown: (md) => set({ markdown: md }),

    setTemplate: (t) => set({ template: t }),

    setError: (err) => set({ error: err }),

    generate: async () => {
        const { repoUrl, template } = get();
        const parsed = parseRepoUrl(repoUrl);

        if (!parsed) {
            set({ error: 'Invalid GitHub URL. Use format: https://github.com/owner/repo' });
            return;
        }

        set({ loading: true, error: null, loadingStep: 'Fetching repository data...' });

        try {
            const repoData = await fetchRepoData(parsed.owner, parsed.repo, get().pat || undefined);
            set({ repoData, loadingStep: 'Analyzing repository structure...' });

            const analysis = analyzeRepo(repoData);
            set({ analysis, loadingStep: 'Generating README...' });

            const markdown = generateReadme(repoData, analysis, template);
            set({ markdown, loading: false, loadingStep: '' });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            set({ loading: false, error: message, loadingStep: '' });
        }
    },

    regenerate: async () => {
        const { repoData, analysis, template } = get();
        if (!repoData || !analysis) {
            await get().generate();
            return;
        }

        set({ loading: true, loadingStep: 'Regenerating README...' });

        try {
            const markdown = generateReadme(repoData, analysis, template);
            set({ markdown, loading: false, loadingStep: '' });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            set({ loading: false, error: message, loadingStep: '' });
        }
    },

    reset: () =>
        set({
            repoUrl: '',
            repoData: null,
            analysis: null,
            markdown: '',
            template: 'professional',
            loading: false,
            loadingStep: '',
            error: null,
            // intentionnally not resetting pat so it persists across resets
        }),
}));
