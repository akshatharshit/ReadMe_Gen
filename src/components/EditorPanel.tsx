import { useReadmeStore } from '../store/readmeStore';
import { useState } from 'react';

export default function EditorPanel() {
    const { markdown, setMarkdown } = useReadmeStore();
    const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

    const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const textBefore = target.value.substring(0, target.selectionStart);
        const lines = textBefore.split('\n');
        setCursorPos({
            line: lines.length,
            col: lines[lines.length - 1].length + 1,
        });
    };

    const totalLines = markdown ? markdown.split('\n').length : 0;
    const totalBytes = new Blob([markdown]).size;

    return (
        <div className="flex-1 w-full bg-[#080c11] relative group overflow-hidden flex flex-col">
            <div className="flex-1 relative overflow-hidden">
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    onKeyUp={handleSelect}
                    onClick={handleSelect}
                    className="editor-textarea absolute inset-0 text-emerald-300 selection:bg-cli-green/30 selection:text-white p-4 font-mono text-sm leading-relaxed"
                    spellCheck={false}
                    placeholder="# Type your markdown here..."
                />
            </div>

            {/* Vim status line */}
            <div className="h-7 bg-[#0f1722] border-t border-white/10 flex justify-between items-center px-3 text-[11px] text-white select-none z-10 font-mono">
                <div className="flex items-center gap-3">
                    <span className="bg-cli-green text-black px-1.5 py-0.5 font-bold uppercase rounded text-[10px]">
                        EDIT MODE
                    </span>
                    <span className="text-cli-amber font-semibold">README.md</span>
                    <span className="text-gray-500 hidden sm:inline">[Modified]</span>
                </div>
                <div className="flex items-center gap-3 text-cli-gray-light text-[11px]">
                    <span className="hidden sm:inline">{totalBytes} B</span>
                    <span>UTF-8</span>
                    <span>MD</span>
                    <span className="text-cli-cyan font-bold">
                        Ln {cursorPos.line}, Col {cursorPos.col}
                    </span>
                    <span className="hidden md:inline">({totalLines} lines)</span>
                </div>
            </div>
        </div>
    );
}
