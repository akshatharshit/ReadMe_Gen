import { useState } from 'react';
import { useReadmeStore } from '../store/readmeStore';
import { Sparkles, Key, Zap, Search, ArrowRight, ShieldCheck } from 'lucide-react';

const POPULAR_REPOS = [
    { label: 'vercel/next.js', desc: 'Next.js' },
    { label: 'facebook/react', desc: 'React' },
    { label: 'shadcn-ui/ui', desc: 'Shadcn UI' },
    { label: 'astral-sh/uv', desc: 'UV Fast Python' },
    { label: 'tailwindlabs/tailwindcss', desc: 'Tailwind' },
];

export default function RepoInput() {
    const { repoUrl, setUrl, generate, loading, pat, setPat, loadDemoRepo } = useReadmeStore();
    const [focused, setFocused] = useState(false);
    const [showTokenInput, setShowTokenInput] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (repoUrl.trim() && !loading) {
            generate();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto font-mono text-sm relative z-10">
            {/* Ambient glow container */}
            <div
                className={`absolute -inset-1.5 bg-gradient-to-r from-cli-green/20 via-cli-cyan/20 to-cli-purple/20 blur-xl transition-opacity duration-700 rounded-xl ${
                    focused ? 'opacity-100' : 'opacity-40'
                }`}
            />

            {/* Input Card */}
            <div
                className={`cli-panel rounded-lg p-2.5 sm:p-3 relative transition-all duration-300 border ${
                    focused ? 'border-cli-green shadow-[0_0_30px_rgba(0,255,102,0.25)]' : 'border-white/10'
                }`}
            >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex items-center gap-2.5 px-3 py-1 flex-1">
                        <span className="text-cli-green font-bold text-base flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-cli-green animate-pulse-dot" />
                            <Search className="w-4 h-4 text-cli-green shrink-0" />
                        </span>
                        <input
                            type="text"
                            value={repoUrl}
                            onChange={(e) => setUrl(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder="github.com/owner/repository  or  owner/repo"
                            className="cli-input text-sm sm:text-base py-1.5 flex-1 font-semibold tracking-wide text-white placeholder:text-gray-500"
                            disabled={loading}
                            autoComplete="off"
                            spellCheck="false"
                            name="repo_url_entry"
                        />
                    </div>

                    <div className="flex items-center gap-2 px-1">
                        <button
                            type="button"
                            onClick={() => loadDemoRepo()}
                            disabled={loading}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded text-cli-cyan bg-cli-cyan/10 hover:bg-cli-cyan hover:text-black border border-cli-cyan/30 transition-all shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                            title="Load pre-analyzed demo project immediately"
                        >
                            <Zap className="w-3.5 h-3.5" />
                            <span>1-Click Demo</span>
                        </button>

                        <button
                            type="submit"
                            disabled={!repoUrl.trim() || loading}
                            className="cli-button px-5 py-2.5 rounded flex items-center justify-center gap-2 text-xs font-bold text-shadow-glow flex-1 sm:flex-none"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full" />
                                    [ EXECUTING ]
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <span>[ GENERATE README ]</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-bar: Example Chips & Token Setting */}
            <div className="mt-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-cli-gray-light px-1">
                {/* Popular Repo Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-gray-500 mr-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cli-amber" />
                        try:
                    </span>
                    {POPULAR_REPOS.map(({ label, desc }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() => {
                                setUrl(`https://github.com/${label}`);
                            }}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-cli-green/50 hover:text-cli-green transition-all"
                            title={`Load ${label}`}
                        >
                            {desc}
                        </button>
                    ))}
                </div>

                {/* PAT Toggle Button */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                        type="button"
                        onClick={() => setShowTokenInput(!showTokenInput)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-all ${
                            pat
                                ? 'border-cli-green/40 text-cli-green bg-cli-green/10'
                                : 'border-white/10 text-cli-gray-light hover:text-white'
                        }`}
                    >
                        <Key className="w-3 h-3 text-cli-amber" />
                        <span>{pat ? 'PAT: Configured' : 'GitHub Token (Optional)'}</span>
                    </button>
                </div>
            </div>

            {/* Collapsible PAT configuration box */}
            {showTokenInput && (
                <div className="mt-3 p-3 rounded-lg bg-black/80 border border-cli-amber/30 text-xs text-white animate-matrix flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-cli-amber shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-cli-amber">GitHub Personal Access Token</p>
                            <p className="text-[11px] text-cli-gray-light">
                                Increases GitHub API rate limit from 60 to 5,000 requests/hr. Kept strictly in client memory.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="password"
                            placeholder="ghp_xxxxxxxxxxxx"
                            value={pat || ''}
                            onChange={(e) => setPat(e.target.value || null)}
                            className="cli-input bg-white/5 border border-white/20 rounded px-2.5 py-1 text-xs text-cli-green w-48 focus:border-cli-green"
                        />
                        {pat && (
                            <button
                                type="button"
                                onClick={() => setPat(null)}
                                className="text-[11px] text-cli-red hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            )}
        </form>
    );
}
