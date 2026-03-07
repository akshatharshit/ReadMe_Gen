import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useReadmeStore } from '../store/readmeStore';

export default function ReadmePreview() {
    const { markdown } = useReadmeStore();

    if (!markdown) {
        return (
            <div className="flex-1 flex items-center justify-center text-cli-gray-light p-6 font-mono">
                <p>{"[ NO CONTENT LOADED ]"}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-cli-black relative">
            <div className="absolute top-2 right-4 text-xs text-cli-gray-light opacity-50 select-none">
                [ read-only ]
            </div>
            <div className="markdown-body font-mono text-sm max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: ({ ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </div>

            <div className="mt-8 text-center text-xs text-cli-gray border-t border-cli-gray pt-4">
                -- EOF --
            </div>
        </div>
    );
}
