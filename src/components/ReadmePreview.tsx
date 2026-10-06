import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useReadmeStore } from '../store/readmeStore';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

function CodeBlock({ children, className, ...props }: any) {
    const [copied, setCopied] = useState(false);
    const codeString = String(children).replace(/\n$/, '');
    const isInline = !className;

    if (isInline) {
        return <code className={className} {...props}>{children}</code>;
    }

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="relative group my-3">
            <button
                onClick={copyCode}
                className="absolute top-2.5 right-2.5 px-2 py-1 text-[11px] rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 backdrop-blur-sm z-10"
                title="Copy code snippet"
            >
                {copied ? <Check className="w-3 h-3 text-cli-green" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className={className} {...props}>
                <code>{children}</code>
            </pre>
        </div>
    );
}

export default function ReadmePreview() {
    const { markdown } = useReadmeStore();

    if (!markdown) {
        return (
            <div className="flex-1 flex items-center justify-center text-cli-gray-light p-6 font-mono">
                <p>[ NO CONTENT LOADED ]</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto p-5 md:p-8 bg-[#090d13] relative selection:bg-cli-green/30">
            <div className="absolute top-3 right-5 text-[11px] text-cli-gray-light/60 font-mono select-none">
                [ rendered markdown :: read-only ]
            </div>

            <div className="markdown-body font-mono text-sm max-w-4xl mx-auto">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: ({ ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                        code: CodeBlock,
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </div>

            <div className="mt-12 mb-6 text-center text-xs text-gray-600 border-t border-white/10 pt-6 font-mono">
                -- END OF DOCUMENTATION --
            </div>
        </div>
    );
}
