import { Terminal } from 'lucide-react';

export default function Header() {
    return (
        <header className="w-full py-4 px-6 flex items-center justify-between border-b border-cli-gray bg-cli-bg z-10">
            <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-cli-green" />
                <div>
                    <h1 className="text-base font-bold text-cli-white hover:animate-glitch cursor-default transition-all">
                        <span className="text-cli-green text-shadow-glow">root@</span>readme-gen<span className="text-cli-gray-light">:~#</span>
                    </h1>
                </div>
            </div>

            <a
                href="https://github.com/readme-gen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cli-gray-light hover:text-cli-white transition-colors text-sm flex items-center gap-2"
            >
                [ src ]
            </a>
        </header>
    );
}
