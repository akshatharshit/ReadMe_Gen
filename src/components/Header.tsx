import { Terminal, Zap, Tv, RotateCcw, Github } from 'lucide-react';
import { useReadmeStore } from '../store/readmeStore';

export default function Header() {
    const { loadDemoRepo, repoData, reset, scanlinesEnabled, toggleScanlines, loading } = useReadmeStore();

    return (
        <header className="w-full py-3.5 px-4 md:px-8 flex items-center justify-between border-b border-white/10 bg-[#070b10]/90 backdrop-blur-md z-20 sticky top-0">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => reset()}>
                <div className="p-2 rounded bg-cli-green/10 border border-cli-green/40 shadow-[0_0_12px_rgba(0,255,102,0.3)]">
                    <Terminal className="w-5 h-5 text-cli-green animate-pulse" />
                </div>
                <div>
                    <h1 className="text-sm md:text-base font-bold text-white flex items-center gap-1.5 hover:animate-glitch transition-all tracking-wider">
                        <span className="text-cli-green text-shadow-glow">GODTIER</span>
                        <span className="text-cli-gray-light font-normal">::</span>
                        <span>README</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-cli-cyan/15 text-cli-cyan border border-cli-cyan/30 font-semibold tracking-normal hidden sm:inline-block">
                            v2.0
                        </span>
                    </h1>
                    <p className="text-[10px] text-cli-gray-light hidden md:block">
                        Cinematic GitHub Documentation Generator
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2.5">
                {/* 1-Click Demo Loader */}
                {!repoData && (
                    <button
                        onClick={() => loadDemoRepo()}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-cli-cyan/10 border border-cli-cyan/40 text-cli-cyan hover:bg-cli-cyan hover:text-black transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        title="Load rich pre-analyzed demo project instantly"
                    >
                        <Zap className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">DEMO</span> PREVIEW
                    </button>
                )}

                {/* Reset button if repo loaded */}
                {repoData && (
                    <button
                        onClick={() => reset()}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs text-cli-gray-light hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                        title="Start over with a new repository"
                    >
                        <RotateCcw className="w-3.5 h-3.5 text-cli-amber" />
                        <span className="hidden sm:inline">New Repo</span>
                    </button>
                )}

                {/* CRT Scanline Toggle */}
                <button
                    onClick={toggleScanlines}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs border transition-all ${
                        scanlinesEnabled
                            ? 'border-cli-green/40 text-cli-green bg-cli-green/10 shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                            : 'border-white/10 text-cli-gray-light hover:text-white'
                    }`}
                    title="Toggle retro CRT scanline effect"
                >
                    <Tv className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden md:inline">{scanlinesEnabled ? 'CRT: ON' : 'CRT: OFF'}</span>
                </button>

                {/* GitHub link */}
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-cli-gray-light hover:text-white rounded border border-white/10 hover:border-white/30 transition-colors"
                    title="GitHub Repository"
                >
                    <Github className="w-4 h-4" />
                </a>
            </div>
        </header>
    );
}
