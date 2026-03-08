import { useState } from 'react';
import { useReadmeStore } from '../store/readmeStore';

export default function RepoInput() {
    const { repoUrl, setUrl, generate, loading } = useReadmeStore();
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (repoUrl.trim() && !loading) {
            generate();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto font-mono text-sm mt-10 relative z-10">
            {/* The active glow backdrop */}
            <div className={`absolute -inset-1 bg-cli-green/5 blur-xl transition-opacity duration-500 rounded-full ${focused ? 'opacity-100' : 'opacity-0'}`} />

            <div className={`cli-panel relative transition-all duration-300 ${focused ? 'cli-border-active bg-black/80' : 'bg-black/60'}`}>
                <div className="flex items-center gap-3">
                    <span className="text-cli-amber font-bold">{'>'}</span>
                    <input
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="github.com/owner/repository"
                        className="cli-input text-base py-2 flex-1 mt-1 font-bold tracking-widest text-[#00ff41]"
                        disabled={loading}
                        autoComplete="off"
                        spellCheck="false"
                        name="repo_url_manual_entry"
                    />
                    <button
                        type="submit"
                        disabled={!repoUrl.trim() || loading}
                        className="cli-button [font-weight:700] hover:animate-glitch text-shadow-glow"
                    >
                        {loading ? '[ EXECUTING ]' : '[ EXECUTE ]'}
                    </button>
                </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-cli-gray-light">
                <div className="flex items-center gap-2">
                    <span>examples:</span>
                    {['facebook/react', 'vercel/next.js', 'microsoft/vscode'].map((example) => (
                        <button
                            key={example}
                            type="button"
                            onClick={() => setUrl(`https://github.com/${example}`)}
                            className="hover:text-cli-green hover:underline decoration-cli-green underline-offset-4 transition-colors px-1"
                        >
                            {example}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="whitespace-nowrap">--token=</span>
                    <input
                        type="password"
                        placeholder="[ optional PAT ]"
                        value={useReadmeStore((s) => s.pat) || ''}
                        onChange={(e) => useReadmeStore.getState().setPat(e.target.value || null)}
                        disabled={loading}
                        autoComplete="new-password"
                        name="github_pat_manual"
                        className="cli-input border-b border-cli-gray focus:border-cli-green w-40 px-1 py-0.5 text-xs text-cli-green"
                    />
                </div>
            </div>
        </form>
    );
}
