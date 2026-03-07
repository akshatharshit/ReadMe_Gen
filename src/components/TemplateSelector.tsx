import { useReadmeStore } from '../store/readmeStore';
import type { ReadmeTemplate } from '../types';

const templates = [
    { id: 'professional', label: 'Professional', desc: 'Full-featured w/ architecture' },
    { id: 'startup', label: 'Startup', desc: 'Marketing focused & clean' },
    { id: 'minimal', label: 'Minimal', desc: 'Just the essentials' },
    { id: 'opensource', label: 'Open Source', desc: 'Focus on contributors' },
];

export default function TemplateSelector() {
    const { template, setTemplate, loading } = useReadmeStore();

    if (loading) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 font-mono text-sm">
            <div className="mb-3 text-cli-gray-light uppercase text-xs tracking-wider">
                Select configuration flag:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map(({ id, label, desc }) => {
                    const isActive = template === id;
                    return (
                        <button
                            key={id}
                            onClick={() => setTemplate(id as ReadmeTemplate)}
                            className={`flex flex-col text-left p-3 border transition-colors ${isActive
                                    ? 'border-cli-green bg-cli-green/5'
                                    : 'border-cli-gray hover:border-cli-gray-light'
                                }`}
                        >
                            <div className="flex items-center gap-3 w-full mb-1">
                                <span className={isActive ? 'text-cli-green' : 'text-cli-gray'}>
                                    {isActive ? '[x]' : '[ ]'}
                                </span>
                                <span className={isActive ? 'text-cli-white font-bold' : 'text-cli-gray-light'}>
                                    --template={label.toLowerCase().replace(' ', '-')}
                                </span>
                            </div>
                            <span className={`text-xs ml-9 ${isActive ? 'text-cli-green' : 'text-cli-gray'}`}>
                                # {desc}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
