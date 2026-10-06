import { useReadmeStore } from '../store/readmeStore';
import type { ReadmeTemplate } from '../types';
import { Crown, Briefcase, Rocket, Users, Terminal, Zap } from 'lucide-react';

export const TEMPLATES_META = [
    {
        id: 'godtier' as const,
        label: 'God Tier Ultimate',
        icon: Crown,
        tag: 'Recommended',
        tagColor: 'bg-cli-amber/20 text-cli-amber border-cli-amber/40',
        desc: 'Maximum cinematic quality. Animated typing header, Mermaid architecture, Star History, Deploy buttons & Contributor rocks.',
    },
    {
        id: 'professional' as const,
        label: 'Enterprise Pro',
        icon: Briefcase,
        tag: 'Enterprise',
        tagColor: 'bg-cli-cyan/20 text-cli-cyan border-cli-cyan/40',
        desc: 'Clean corporate layout with compliance, CI/CD pipeline, API specifications, and architecture diagrams.',
    },
    {
        id: 'startup' as const,
        label: 'High-Growth Startup',
        icon: Rocket,
        tag: 'Conversion',
        tagColor: 'bg-cli-green/20 text-cli-green border-cli-green/40',
        desc: 'Product-led marketing layout with live demo showcases, key feature matrices, and 1-click cloud deploy badges.',
    },
    {
        id: 'opensource' as const,
        label: 'Open Source Community',
        icon: Users,
        tag: 'Community',
        tagColor: 'bg-cli-purple/20 text-cli-purple border-cli-purple/40',
        desc: 'Centered around community engagement, Star History trends, contributor rocks, issue templates & commit guidelines.',
    },
    {
        id: 'minimal' as const,
        label: 'Developer Minimal',
        icon: Terminal,
        tag: 'Fast & Pure',
        tagColor: 'bg-white/10 text-white border-white/20',
        desc: 'High-density, distraction-free technical documentation for CLIs, libraries, and developer utilities.',
    },
    {
        id: 'cyberpunk' as const,
        label: 'Cyberpunk Terminal',
        icon: Zap,
        tag: 'Neon Vibe',
        tagColor: 'bg-cli-red/20 text-cli-red border-cli-red/40',
        desc: 'Hacker aesthetic with ASCII borders, neon badge accents, diagnostic telemetry, and matrix styling.',
    },
];

export default function TemplateSelector() {
    const { template, setTemplate, loading } = useReadmeStore();

    if (loading) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 font-mono text-sm">
            <div className="mb-3.5 flex items-center justify-between text-xs">
                <span className="text-cli-gray-light uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cli-green" />
                    SELECT README TEMPLATE ARCHITECTURE:
                </span>
                <span className="text-gray-500 hidden sm:inline">6 God-Tier Presets</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TEMPLATES_META.map(({ id, label, icon: Icon, tag, tagColor, desc }) => {
                    const isActive = template === id;
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setTemplate(id as ReadmeTemplate)}
                            className={`flex flex-col text-left p-3.5 rounded-lg border transition-all duration-200 relative group overflow-hidden ${
                                isActive
                                    ? 'border-cli-green bg-cli-green/10 shadow-[0_0_20px_rgba(0,255,102,0.15)] ring-1 ring-cli-green/50'
                                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]'
                            }`}
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between gap-2 w-full mb-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`p-1.5 rounded ${
                                            isActive
                                                ? 'bg-cli-green/20 text-cli-green'
                                                : 'bg-white/10 text-cli-gray-light group-hover:text-white'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span
                                        className={`font-bold text-xs sm:text-sm tracking-tight ${
                                            isActive ? 'text-white' : 'text-gray-300'
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                                <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${tagColor}`}
                                >
                                    {tag}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-cli-gray-light line-clamp-2 leading-relaxed">
                                {desc}
                            </p>

                            {/* Active indicator badge */}
                            <div className="mt-2.5 flex items-center gap-1.5 text-[11px]">
                                <span className={isActive ? 'text-cli-green font-bold' : 'text-gray-500'}>
                                    {isActive ? '● ACTIVE' : '○ SELECT'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
