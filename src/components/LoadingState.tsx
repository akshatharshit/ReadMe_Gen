import { useReadmeStore } from '../store/readmeStore';
import { Cpu, Terminal, CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
    { label: 'Connecting to GitHub API & parsing telemetry...', match: 'Fetching' },
    { label: 'Decompiling file tree & identifying dependencies...', match: 'Analyzing' },
    { label: 'Synthesizing God-Tier README architecture...', match: 'Generating' },
];

function getActiveStep(loadingStep: string): number {
    if (loadingStep.toLowerCase().includes('booting') || loadingStep.toLowerCase().includes('fetching')) return 0;
    if (loadingStep.toLowerCase().includes('analyzing') || loadingStep.toLowerCase().includes('decompiling')) return 1;
    if (loadingStep.toLowerCase().includes('generating') || loadingStep.toLowerCase().includes('synthesizing')) return 2;
    return 0;
}

export default function LoadingState() {
    const { loading, loadingStep } = useReadmeStore();

    if (!loading) return null;

    const activeIdx = getActiveStep(loadingStep);
    const progressPercent = Math.min(100, Math.floor(((activeIdx + 0.8) / STEPS.length) * 100));

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 animate-matrix font-mono text-sm">
            <div className="cli-panel rounded-lg p-5 border border-cli-green/40 shadow-[0_0_30px_rgba(0,255,102,0.15)]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-cli-green font-bold text-xs tracking-wider">
                        <Cpu className="w-4 h-4 animate-pulse" />
                        <span>COMPILATION IN PROGRESS</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cli-cyan font-semibold">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{progressPercent}% COMPLETE</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-5">
                    <div
                        className="h-full bg-gradient-to-r from-cli-green via-cli-cyan to-cli-green rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,255,102,0.6)]"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Terminal execution log */}
                <div className="space-y-2 text-xs bg-black/50 p-3 rounded border border-white/5">
                    {STEPS.map((step, i) => {
                        const isDone = i < activeIdx;
                        const isActive = i === activeIdx;

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 transition-colors ${
                                    isDone
                                        ? 'text-gray-400'
                                        : isActive
                                        ? 'text-white font-semibold'
                                        : 'text-gray-600'
                                }`}
                            >
                                <span className="shrink-0">
                                    {isDone ? (
                                        <CheckCircle2 className="w-4 h-4 text-cli-green" />
                                    ) : isActive ? (
                                        <span className="w-4 h-4 rounded-full border-2 border-cli-cyan border-t-transparent animate-spin inline-block" />
                                    ) : (
                                        <Terminal className="w-4 h-4 text-gray-700" />
                                    )}
                                </span>
                                <span>{step.label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Status line */}
                <div className="mt-3 text-[11px] text-cli-gray-light flex items-center justify-between">
                    <span className="truncate">thread: {loadingStep || 'Processing...'}</span>
                    <span className="text-cli-amber shrink-0 ml-2">sys: active</span>
                </div>
            </div>
        </div>
    );
}
