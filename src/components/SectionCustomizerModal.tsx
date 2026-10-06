import { useReadmeStore } from '../store/readmeStore';
import { X, CheckSquare, Square, SlidersHorizontal, Sparkles } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SECTION_DEFS = [
    { key: 'showBadges', label: 'Badges Suite (Stars, Forks, License, PRs)', category: 'Header' },
    { key: 'showDeployButtons', label: '1-Click Cloud Deploy Buttons (Vercel, Railway)', category: 'Header' },
    { key: 'showFeatures', label: 'Feature Matrix & Capabilities Table', category: 'Core' },
    { key: 'showTechStack', label: 'Tech Stack Badges & Language Distribution', category: 'Core' },
    { key: 'showArchitecture', label: 'Annotated Project Structure Tree', category: 'Architecture' },
    { key: 'showMermaid', label: 'Mermaid System Architecture Flowchart', category: 'Architecture' },
    { key: 'showInstall', label: 'Step-by-Step Installation & Docker Guide', category: 'Usage' },
    { key: 'showUsage', label: 'CLI & Script Commands Table', category: 'Usage' },
    { key: 'showEnv', label: 'Environment Variables & .env Schema', category: 'Usage' },
    { key: 'showApi', label: 'API Specification & Route Endpoints', category: 'Technical' },
    { key: 'showRoadmap', label: 'Upcoming Roadmap Milestones', category: 'Community' },
    { key: 'showStarHistory', label: 'Star History Growth Chart', category: 'Community' },
    { key: 'showContributors', label: 'Hall of Contributors Grid', category: 'Community' },
    { key: 'showFaq', label: 'FAQ & Troubleshooting Dropdowns', category: 'Help' },
    { key: 'showLicense', label: 'License & Attribution Footer', category: 'Help' },
] as const;

export default function SectionCustomizerModal({ isOpen, onClose }: Props) {
    const { customSections, setCustomSections } = useReadmeStore();

    if (!isOpen) return null;

    const toggleSection = (key: keyof typeof customSections) => {
        setCustomSections({ [key]: !customSections[key] });
    };

    const enableAll = () => {
        const allTrue = Object.keys(customSections).reduce((acc, k) => {
            acc[k as keyof typeof customSections] = true;
            return acc;
        }, {} as Record<string, boolean>);
        setCustomSections(allTrue);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-matrix">
            <div className="w-full max-w-xl bg-[#0b0f14] border border-cli-green/30 shadow-[0_0_50px_rgba(0,255,102,0.15)] rounded-lg overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="w-5 h-5 text-cli-green" />
                        <div>
                            <h3 className="font-bold text-white text-sm tracking-wide">
                                README Section Customizer
                            </h3>
                            <p className="text-xs text-cli-gray-light">
                                Toggle modules to tailor your documentation in real-time
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-cli-gray-light hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Section List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-2 text-sm">
                    {SECTION_DEFS.map(({ key, label }) => {
                        const active = customSections[key as keyof typeof customSections] ?? true;
                        return (
                            <button
                                key={key}
                                onClick={() => toggleSection(key as keyof typeof customSections)}
                                className={`w-full flex items-center justify-between p-3 rounded text-left transition-all border ${
                                    active
                                        ? 'bg-cli-green/10 border-cli-green/40 text-white'
                                        : 'bg-white/5 border-white/5 text-cli-gray-light hover:border-white/20'
                                }`}
                            >
                                <span className="font-medium text-xs sm:text-sm">{label}</span>
                                {active ? (
                                    <CheckSquare className="w-4 h-4 text-cli-green shrink-0 ml-2" />
                                ) : (
                                    <Square className="w-4 h-4 text-cli-gray-light shrink-0 ml-2" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3">
                    <button
                        onClick={enableAll}
                        className="flex items-center gap-1.5 text-xs text-cli-green hover:underline font-mono"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Enable All Modules
                    </button>
                    <button
                        onClick={onClose}
                        className="cli-button px-5 py-2 text-xs font-bold rounded"
                    >
                        [ APPLY & CLOSE ]
                    </button>
                </div>
            </div>
        </div>
    );
}
