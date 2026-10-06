import { create } from 'zustand';
import type { AppState, ReadmeTemplate, SectionCustomization } from '../types';
import { parseRepoUrl } from '../utils/parseRepoUrl';
import { fetchRepoData } from '../services/githubApi';
import { analyzeRepo } from '../services/repoAnalyzer';
import { generateReadme } from '../services/readmeGenerator';
import { DEMO_REPO } from '../services/demoRepo';

const DEFAULT_SECTIONS: SectionCustomization = {
    showBadges: true,
    showArchitecture: true,
    showMermaid: true,
    showFeatures: true,
    showTechStack: true,
    showInstall: true,
    showUsage: true,
    showEnv: true,
    showApi: true,
    showRoadmap: true,
    showContributors: true,
    showStarHistory: true,
    showDeployButtons: true,
    showFaq: true,
    showLicense: true,
};

export const useReadmeStore = create<AppState>((set, get) => ({
    repoUrl: '',
    repoData: null,
    analysis: null,
    markdown: '',
    template: 'godtier' as ReadmeTemplate,
    loading: false,
    loadingStep: '',
    error: null,
    pat: null,
    customSections: DEFAULT_SECTIONS,
    scanlinesEnabled: true,

    setUrl: (url) => set({ repoUrl: url, error: null }),
    setPat: (pat) => set({ pat }),
    setMarkdown: (md) => set({ markdown: md }),

    setTemplate: (t) => {
        set({ template: t });
        const { repoData, analysis, customSections } = get();
        if (repoData && analysis) {
            const markdown = generateReadme(repoData, analysis, t, customSections);
            set({ markdown });
        }
    },

    setError: (err) => set({ error: err }),

    setCustomSections: (newSections) => {
        const updated = { ...get().customSections, ...newSections };
        set({ customSections: updated });
        const { repoData, analysis, template } = get();
        if (repoData && analysis) {
            const markdown = generateReadme(repoData, analysis, template, updated);
            set({ markdown });
        }
    },

    toggleScanlines: () => {
        set((s) => ({ scanlinesEnabled: !s.scanlinesEnabled }));
    },

    loadDemoRepo: () => {
        set({ loading: true, error: null, loadingStep: 'Booting demo simulation...' });
        setTimeout(() => {
            const repoData = DEMO_REPO;
            const analysis = analyzeRepo(repoData);
            const markdown = generateReadme(repoData, analysis, get().template, get().customSections);
            set({
                repoUrl: 'https://github.com/hyperdrive-sh/hyperdrive',
                repoData,
                analysis,
                markdown,
                loading: false,
                loadingStep: '',
            });
        }, 400);
    },

    generate: async () => {
        const { repoUrl, template, customSections } = get();
        const parsed = parseRepoUrl(repoUrl);

        if (!parsed) {
            set({ error: 'Invalid GitHub URL. Use format: https://github.com/owner/repo or owner/repo' });
            return;
        }

        set({ loading: true, error: null, loadingStep: 'Fetching repository telemetry & metadata...' });

        try {
            const repoData = await fetchRepoData(parsed.owner, parsed.repo, get().pat || undefined);
            set({ repoData, loadingStep: 'Decompiling file tree & dependencies...' });

            const analysis = analyzeRepo(repoData);
            set({ analysis, loadingStep: 'Synthesizing God-Tier README architecture...' });

            const markdown = generateReadme(repoData, analysis, template, customSections);
            set({ markdown, loading: false, loadingStep: '' });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            set({ loading: false, error: message, loadingStep: '' });
        }
    },

    regenerate: async () => {
        const { repoData, analysis, template, customSections } = get();
        if (!repoData || !analysis) {
            await get().generate();
            return;
        }

        set({ loading: true, loadingStep: 'Regenerating README specifications...' });

        try {
            const markdown = generateReadme(repoData, analysis, template, customSections);
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
            template: 'godtier',
            loading: false,
            loadingStep: '',
            error: null,
        }),
}));
