import { useReadmeStore } from '../store/readmeStore';

export default function EditorPanel() {
    const { markdown, setMarkdown } = useReadmeStore();

    return (
        <div className="flex-1 w-full bg-[#0a0a0a] relative group overflow-hidden">
            {/* Top right indicator */}
            <div className="absolute top-2 right-4 text-xs text-cli-gray-light opacity-50 select-none z-10">
                100%
            </div>

            <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="editor-textarea absolute inset-0 text-[#a3e4d7] selection:bg-[#a3e4d7] selection:text-[#000]"
                spellCheck={false}
                placeholder="Content..."
            />
            {/* Vim status line fake */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-cli-gray-dark border-t border-cli-gray flex justify-between items-center px-2 text-[10px] text-white select-none z-10 leading-none">
                <div className="flex items-center gap-4">
                    <span className="bg-cli-green text-cli-bg px-2 font-bold uppercase">NORMAL</span>
                    <span className="text-cli-amber">README.md</span>
                </div>
                <div className="flex items-center gap-4 text-cli-gray-light">
                    <span>utf-8</span>
                    <span>markdown</span>
                    <span>1,1</span>
                    <span>Top</span>
                </div>
            </div>
        </div>
    );
}
