import { useReadmeStore } from '../store/readmeStore';
import { AlertTriangle, X, RotateCcw, Zap } from 'lucide-react';

export default function ErrorDisplay() {
    const { error, setError, generate, loadDemoRepo } = useReadmeStore();

    if (!error) return null;

    const isRateLimit = error.toLowerCase().includes('rate limit');

    return (
        <div className="w-full max-w-3xl mx-auto mt-6 animate-matrix font-mono text-sm">
            <div className={`cli-panel rounded-lg p-4 border ${isRateLimit ? 'border-cli-amber/50' : 'border-cli-red/50'} shadow-lg`}>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${isRateLimit ? 'text-cli-amber' : 'text-cli-red'}`} />
                        <span className={`font-bold text-xs tracking-wider ${isRateLimit ? 'text-cli-amber' : 'text-cli-red'}`}>
                            {isRateLimit ? 'GITHUB API RATE LIMIT REACHED' : 'EXECUTION EXCEPTION'}
                        </span>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-cli-gray-light hover:text-white p-1 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-white text-xs mb-4 leading-relaxed bg-black/40 p-2.5 rounded border border-white/5">
                    <span className="text-cli-gray-light">stderr: </span>
                    {error}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => generate()}
                        className="cli-button px-3 py-1.5 rounded text-xs flex items-center gap-1.5"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Execution</span>
                    </button>

                    {isRateLimit && (
                        <button
                            onClick={() => loadDemoRepo()}
                            className="px-3 py-1.5 rounded text-xs font-semibold bg-cli-cyan/15 border border-cli-cyan/40 text-cli-cyan hover:bg-cli-cyan hover:text-black transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Load Offline Demo Repository</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
