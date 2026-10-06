import { useReadmeStore } from '../store/readmeStore';
import { Copy, Download, RefreshCw, CheckCircle2, SlidersHorizontal, Sparkles, Code2 } from 'lucide-react';
import { useState } from 'react';
import type { ReadmeTemplate } from '../types';
import SectionCustomizerModal from './SectionCustomizerModal';

const TEMPLATE_OPTIONS: { id: ReadmeTemplate; label: string }[] = [
    { id: 'godtier', label: '👑 God Tier' },
    { id: 'professional', label: '💼 Enterprise' },
    { id: 'startup', label: '🚀 Startup' },
    { id: 'opensource', label: '🌟 Open Source' },
    { id: 'minimal', label: '⚡ Minimal' },
    { id: 'cyberpunk', label: '🎮 Cyberpunk' },
];

export default function ActionBar() {
    const { markdown, regenerate, loading, repoData, template, setTemplate } = useReadmeStore();
    const [copiedRaw, setCopiedRaw] = useState(false);
    const [copiedHtml, setCopiedHtml] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleCopyRaw = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopiedRaw(true);
            setTimeout(() => setCopiedRaw(false), 2000);
        } catch (err) {
            console.error('Failed to copy markdown', err);
        }
    };

    const handleCopyHtml = async () => {
        try {
            // Basic HTML wrapper for markdown
            await navigator.clipboard.writeText(`<article class="markdown-body">\n${markdown}\n</article>`);
            setCopiedHtml(true);
            setTimeout(() => setCopiedHtml(false), 2000);
        } catch (err) {
            console.error('Failed to copy HTML', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `README_${repoData?.name || 'project'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const words = markdown ? markdown.split(/\s+/).filter(Boolean).length : 0;
    const lines = markdown ? markdown.split('\n').length : 0;
    const readTimeMin = Math.max(1, Math.round(words / 200));

    return (
        <>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 bg-[#0a0f16] border border-white/10 border-b-0">
                {/* Left: In-results Template Switcher & Customizer Button */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-cli-gray-light uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-cli-green" />
                        Template:
                    </span>
                    <div className="flex flex-wrap items-center gap-1">
                        {TEMPLATE_OPTIONS.map((opt) => {
                            const isCurrent = template === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setTemplate(opt.id)}
                                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                                        isCurrent
                                            ? 'bg-cli-green text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
                                            : 'bg-white/5 text-cli-gray-light hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Customize Sections Button */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-cli-cyan/10 border border-cli-cyan/30 text-cli-cyan hover:bg-cli-cyan hover:text-black transition-all ml-1"
                        title="Toggle individual sections on or off"
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Modules</span>
                    </button>
                </div>

                {/* Right: Actions & Telemetry */}
                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    <div className="text-[11px] text-cli-gray-light hidden xl:flex items-center gap-3 font-mono">
                        <span><b className="text-white">{words}</b> words</span>
                        <span><b className="text-white">{lines}</b> lines</span>
                        <span>~<b className="text-white">{readTimeMin}</b> min read</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={handleCopyRaw}
                            disabled={!markdown}
                            className="cli-button px-3 py-1.5 rounded flex items-center justify-center gap-1.5 text-xs font-semibold flex-1 sm:flex-none"
                            title="Copy Markdown to Clipboard"
                        >
                            {copiedRaw ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                                    <span>COPIED!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>COPY MD</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleCopyHtml}
                            disabled={!markdown}
                            className="px-2.5 py-1.5 rounded text-xs text-cli-cyan bg-cli-cyan/10 border border-cli-cyan/30 hover:bg-cli-cyan hover:text-black transition-all hidden sm:flex items-center gap-1"
                            title="Copy formatted HTML snippet"
                        >
                            {copiedHtml ? <CheckCircle2 className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
                            <span>HTML</span>
                        </button>

                        <button
                            onClick={handleDownload}
                            disabled={!markdown}
                            className="cli-button px-3 py-1.5 rounded flex items-center justify-center gap-1.5 text-xs font-semibold flex-1 sm:flex-none"
                            title="Download as README.md"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>DOWNLOAD</span>
                        </button>

                        <button
                            onClick={() => regenerate()}
                            disabled={loading || !markdown}
                            className="p-1.5 rounded bg-white/5 border border-white/10 text-cli-gray-light hover:text-white hover:border-white/30 transition-all"
                            title="Regenerate documentation"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cli-green' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            <SectionCustomizerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}
