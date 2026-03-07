import { useReadmeStore } from '../store/readmeStore';
import { Copy, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ActionBar() {
    const { markdown, regenerate, loading, repoData } = useReadmeStore();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `README_${repoData?.name || 'generated'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-cli-black border border-cli-gray border-b-0">
            <div className="text-cli-gray-light text-xs hidden sm:flex items-center gap-4">
                <span><span className="text-cli-amber font-bold">words:</span> {markdown.split(/\s+/).length}</span>
                <span><span className="text-cli-cyan font-bold">lines:</span> {markdown.split('\n').length}</span>
                <span><span className="text-cli-green font-bold">encoding:</span> UTF-8</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                    onClick={handleCopy}
                    disabled={!markdown}
                    className="cli-button flex-1 sm:flex-none flex justify-center items-center gap-2 text-xs"
                >
                    {copied ? (
                        <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            [ COPIED ]
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            [ COPY ]
                        </>
                    )}
                </button>

                <button
                    onClick={handleDownload}
                    disabled={!markdown}
                    className="cli-button flex-1 sm:flex-none flex justify-center items-center gap-2 text-xs"
                >
                    <Download className="w-3.5 h-3.5" />
                    [ DOWNLOAD ]
                </button>

                <button
                    onClick={() => regenerate()}
                    disabled={loading || !markdown}
                    className="cli-button-secondary w-full sm:w-auto flex justify-center items-center gap-2 text-xs mt-2 sm:mt-0"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? '[ REGENERATING... ]' : '[ REGENERATE ]'}
                </button>
            </div>
        </div>
    );
}
