import { useReadmeStore } from '../store/readmeStore';

const STEPS = [
    { label: 'Fetching repository data...', match: 'Fetching' },
    { label: 'Analyzing repository structure...', match: 'Analyzing' },
    { label: 'Generating README...', match: 'Generating', match2: 'Regenerating' },
];

function getActiveStep(loadingStep: string): number {
    if (loadingStep.includes('Fetching')) return 0;
    if (loadingStep.includes('Analyzing')) return 1;
    if (loadingStep.includes('Generating') || loadingStep.includes('Regenerating')) return 2;
    return 0;
}

export default function LoadingState() {
    const { loading, loadingStep } = useReadmeStore();

    if (!loading) return null;

    const activeIdx = getActiveStep(loadingStep);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 animate-matrix font-mono text-sm">
            <div className="cli-panel">
                <div className="mb-4 text-cli-cyan border-b border-cli-gray pb-2">
                    [*] EXECUTION IN PROGRESS
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-cli-gray-light">[</span>
                    <div className="flex-1 flex text-cli-green">
                        {Array.from({ length: 40 }).map((_, i) => {
                            const progress = (activeIdx + 1) / STEPS.length;
                            const fill = Math.floor(progress * 40);
                            return <span key={i}>{i < fill ? '=' : i === fill ? '>' : '\u00A0'}</span>;
                        })}
                    </div>
                    <span className="text-cli-gray-light">]</span>
                    <span className="text-cli-green w-10 text-right">
                        {Math.floor(((activeIdx + 1) / STEPS.length) * 100)}%
                    </span>
                </div>

                {/* Stdout lines */}
                <div className="space-y-1">
                    {STEPS.map((step, i) => {
                        const isDone = i < activeIdx;
                        const isActive = i === activeIdx;

                        return (
                            <div key={i} className={`flex items-start gap-3 ${isDone ? 'text-cli-gray-light' : isActive ? 'text-cli-green' : 'text-cli-gray'}`}>
                                <span className={isDone ? 'text-cli-green' : isActive ? 'text-cli-amber animate-blink' : 'text-cli-gray'}>
                                    {isDone ? '[OK]' : isActive ? '[>>]' : '[  ]'}
                                </span>
                                <span>{step.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
