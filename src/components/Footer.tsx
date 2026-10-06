export default function Footer() {
    return (
        <footer className="w-full py-2.5 px-6 border-t border-white/10 text-xs bg-[#070b10]/95 backdrop-blur-md z-20 flex flex-col sm:flex-row items-center justify-between gap-2 text-cli-gray-light font-mono">
            <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cli-green animate-pulse" />
                <span>ENGINE: <b className="text-white">ONLINE</b></span>
                <span className="text-gray-600">|</span>
                <span className="hidden md:inline">ARCHITECTURE: <b className="text-cli-cyan">MERMAID + SHIELDS.IO</b></span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
                <span className="hidden lg:inline text-gray-500">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">Enter</kbd> to execute
                </span>
                <span>
                    <span className="text-cli-green">GODTIER</span> README GENERATOR
                </span>
            </div>
        </footer>
    );
}
