import { useReadmeStore } from './store/readmeStore';
import Header from './components/Header';
import RepoInput from './components/RepoInput';
import TemplateSelector from './components/TemplateSelector';
import ReadmePreview from './components/ReadmePreview';
import EditorPanel from './components/EditorPanel';
import ActionBar from './components/ActionBar';
import LoadingState from './components/LoadingState';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import { useState, useEffect } from 'react';
import { Star, GitFork, BookOpen, AlertCircle, Eye, Maximize2, Minimize2, ExternalLink, Sparkles, Network } from 'lucide-react';

function StatBadge({ icon: Icon, label, value, color = 'text-cli-green' }: { icon: any; label: string; value: string | number; color?: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <Icon className={`w-3.5 h-3.5 ${color}`} />
            <span className="text-cli-gray-light hidden sm:inline">{label}:</span>
            <span className="text-white font-semibold font-mono">{value}</span>
        </div>
    );
}

export default function App() {
    const { repoData, error, scanlinesEnabled } = useReadmeStore();
    const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (scanlinesEnabled) {
            document.body.classList.add('scanlines-active');
        } else {
            document.body.classList.remove('scanlines-active');
        }
    }, [scanlinesEnabled]);

    return (
        <div className="min-h-screen flex flex-col font-mono relative overflow-hidden bg-[#06080b] text-white selection:bg-cli-green/30">
            <MatrixRain />

            <Header />

            <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 relative z-10 w-full max-w-[1700px] mx-auto">
                {/* Hero View */}
                {!repoData && (
                    <div className="w-full flex-1 flex flex-col justify-center max-w-4xl mx-auto py-8 md:py-12">
                        {/* Title & Badge */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cli-green/10 border border-cli-green/30 text-cli-green text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                <span>THE NEXT-GEN GITHUB README ENGINE</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                                Craft <span className="text-cli-green text-shadow-glow">God-Tier</span> READMEs <br className="hidden sm:block" />
                                in Milliseconds.
                            </h2>

                            <p className="text-cli-gray-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                                Deep repository telemetry analyzer that generates cinematic architecture diagrams,
                                dynamic Shields.io suites, Star History charts, feature matrices, and one-click cloud deploy badges.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-[11px] text-gray-400">
                                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
                                    <Network className="w-3 h-3 text-cli-cyan" />
                                    Mermaid Architecture Flowcharts
                                </span>
                                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
                                    <Star className="w-3 h-3 text-cli-amber" />
                                    Star History Analytics
                                </span>
                                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-cli-green" />
                                    Live Section Customizer
                                </span>
                            </div>
                        </div>

                        <RepoInput />
                        <ErrorDisplay />
                        <TemplateSelector />
                        <LoadingState />
                    </div>
                )}

                {/* Results View (Split Pane Workspace) */}
                {repoData && !error && (
                    <div
                        className={`w-full flex flex-col animate-matrix ${
                            fullscreen
                                ? 'fixed inset-0 z-50 p-4 bg-[#06080b]'
                                : 'h-[calc(100vh-135px)]'
                        }`}
                    >
                        {/* Repository Telemetry Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 p-3 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <img
                                    src={repoData.avatarUrl}
                                    alt={repoData.owner}
                                    className="w-10 h-10 rounded-md border border-cli-green/40 shadow-[0_0_10px_rgba(0,255,102,0.2)]"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-sm md:text-base font-bold text-white tracking-wide">
                                            {repoData.fullName}
                                        </h2>
                                        <a
                                            href={`https://github.com/${repoData.owner}/${repoData.repo}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cli-gray-light hover:text-cli-green transition-colors"
                                            title="View on GitHub"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                    <p className="text-cli-gray-light text-xs mt-0.5 max-w-xl truncate">
                                        {repoData.description || 'No description provided.'}
                                    </p>
                                </div>
                            </div>

                            {/* Stat Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                                <StatBadge icon={Star} label="Stars" value={repoData.stars.toLocaleString()} color="text-cli-amber" />
                                <StatBadge icon={GitFork} label="Forks" value={repoData.forks.toLocaleString()} color="text-cli-purple" />
                                <StatBadge icon={Eye} label="Watchers" value={repoData.watchers.toLocaleString()} color="text-cli-cyan" />
                                <StatBadge icon={AlertCircle} label="Issues" value={repoData.openIssues.toLocaleString()} color="text-cli-red" />
                                {repoData.license && (
                                    <StatBadge icon={BookOpen} label="License" value={repoData.license.toUpperCase()} color="text-cli-green" />
                                )}
                                <button
                                    onClick={() => setFullscreen(!fullscreen)}
                                    className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-white/30 text-cli-gray-light hover:text-white transition-all ml-1"
                                    title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen Workspace'}
                                >
                                    {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Top Action Bar & Live In-Result Template Switcher */}
                        <ActionBar />

                        {/* Dual Split Panes */}
                        <div className="flex-1 border border-white/10 rounded-b-lg bg-[#080c12] flex flex-col md:flex-row overflow-hidden relative shadow-2xl">
                            {/* Mobile Tabs */}
                            <div className="md:hidden flex border-b border-white/10 bg-[#0a0f16] isolate z-10">
                                <button
                                    className={`flex-1 py-2.5 text-xs font-bold transition-all ${
                                        activeTab === 'preview'
                                            ? 'text-cli-green border-b-2 border-cli-green bg-cli-green/10'
                                            : 'text-cli-gray-light hover:text-white'
                                    }`}
                                    onClick={() => setActiveTab('preview')}
                                >
                                    [ RENDERED PREVIEW ]
                                </button>
                                <button
                                    className={`flex-1 py-2.5 text-xs font-bold transition-all border-l border-white/10 ${
                                        activeTab === 'editor'
                                            ? 'text-cli-green border-b-2 border-cli-green bg-cli-green/10'
                                            : 'text-cli-gray-light hover:text-white'
                                    }`}
                                    onClick={() => setActiveTab('editor')}
                                >
                                    [ RAW EDITOR ]
                                </button>
                            </div>

                            {/* Preview Pane */}
                            <div
                                className={`${
                                    activeTab === 'preview' ? 'flex' : 'hidden'
                                } md:flex flex-1 flex-col h-full border-r border-white/10 bg-[#090d13] min-w-0`}
                            >
                                <div className="bg-[#0f1722] px-3.5 py-1.5 flex items-center justify-between border-b border-white/10 text-xs text-cli-gray-light sticky top-0 z-10">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-cli-green" />
                                        <span className="text-white font-semibold">VIEWPORT:</span> README.md (Rendered)
                                    </span>
                                    <span className="text-[11px] text-gray-500 hidden sm:inline">GitHub GFM Compatible</span>
                                </div>
                                <ReadmePreview />
                            </div>

                            {/* Editor Pane */}
                            <div
                                className={`${
                                    activeTab === 'editor' ? 'flex' : 'hidden'
                                } md:flex flex-1 flex-col h-full bg-[#080c11] min-w-0`}
                            >
                                <div className="bg-[#0f1722] px-3.5 py-1.5 flex items-center justify-between border-b border-white/10 text-xs text-cli-gray-light sticky top-0 z-10">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-cli-amber" />
                                        <span className="text-white font-semibold">SOURCE:</span> Markdown Editor
                                    </span>
                                    <span className="text-[11px] text-cli-amber hidden sm:inline">Live Two-Way Edit</span>
                                </div>
                                <EditorPanel />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
