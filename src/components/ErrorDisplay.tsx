import { useReadmeStore } from '../store/readmeStore';

export default function ErrorDisplay() {
    const { error, setError, generate } = useReadmeStore();

    if (!error) return null;

    const isRateLimit = error.toLowerCase().includes('rate limit');

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 animate-matrix font-mono text-sm">
            <div className={`cli-panel border-l-4 ${isRateLimit ? 'border-l-cli-amber' : 'border-l-cli-red'}`}>
                <div className="flex justify-between items-start mb-2">
                    <span className={isRateLimit ? 'text-cli-amber font-bold' : 'text-cli-red font-bold'}>
                        {isRateLimit ? '[ WARNING ] Rate Limit Exceeded' : '[ FATAL EXCEPTION ] Execution Halted'}
                    </span>
                    <button onClick={() => setError(null)} className="text-cli-gray-light hover:text-cli-white">
                        [x]
                    </button>
                </div>

                <p className="text-cli-white mb-4">
                    <span className="text-cli-gray-light">stderr: </span>
                    {error}
                </p>

                {!isRateLimit && (
                    <button onClick={() => generate()} className="cli-button-secondary text-xs">
                        [ RETRY EXECUTION ]
                    </button>
                )}
            </div>
        </div>
    );
}
