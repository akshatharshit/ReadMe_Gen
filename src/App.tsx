import { useReadmeStore } from './store/readmeStore';
import Header from './components/Header';
import RepoInput from './components/RepoInput';
import TemplateSelector from './components/TemplateSelector';
import ReadmePreview from './components/ReadmePreview';
import EditorPanel from './components/EditorPanel';
import ActionBar from './components/ActionBar';
import LoadingState from './components/LoadingState';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import { useState } from 'react';
import { Github, Star, GitFork, BookOpen } from 'lucide-react';

function StatBadge({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 text-cli-gray-light bg-cli-black border border-cli-gray px-2 py-1 text-xs">
      <Icon className="w-3 h-3 text-cli-green" />
      <span className="hidden sm:inline">{label}:</span>
      <span className="text-cli-white font-bold">{value}</span>
    </div>
  );
}

export default function App() {
  const { repoData, error } = useReadmeStore();
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');

  return (
    <div className="min-h-screen flex flex-col font-mono relative overflow-hidden text-shadow-glow">
      <MatrixRain />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-start p-6 relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Hero View */}
        {!repoData && (
          <div className="w-full flex-1 flex flex-col justify-center max-w-4xl mx-auto py-12">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cli-white">
                <span className="text-cli-green">~/</span>readme-generator
              </h2>
              <p className="text-cli-gray-light text-sm md:text-base">
                execute to generate production-ready README.md files instantly.
              </p>
            </div>

            <RepoInput />
            <ErrorDisplay />
            <TemplateSelector />
            <LoadingState />
          </div>
        )}

        {/* Results View (Tmux style) */}
        {repoData && !error && (
          <div className="w-full h-[calc(100vh-140px)] flex flex-col animate-matrix">
            {/* Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-cli-green bg-cli-green/10">
                  <Github className="w-6 h-6 text-cli-green" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cli-white flex items-center gap-2">
                    {repoData.fullName}
                  </h2>
                  <p className="text-cli-gray-light text-xs mt-1 max-w-md truncate">
                    {repoData.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatBadge icon={Star} label="Stars" value={repoData.stars} />
                <StatBadge icon={GitFork} label="Forks" value={repoData.forks} />
                {repoData.license && <StatBadge icon={BookOpen} label="License" value={repoData.license.toUpperCase()} />}
              </div>
            </div>

            {/* Top Action Bar */}
            <ActionBar />

            {/* Split Panes */}
            <div className="flex-1 border border-cli-gray bg-cli-bg flex flex-col md:flex-row overflow-hidden relative">
              {/* Mobile Tabs */}
              <div className="md:hidden flex border-b border-cli-gray bg-cli-black isolate z-10">
                <button
                  className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'preview'
                    ? 'text-cli-green border-b-2 border-cli-green bg-cli-green/5'
                    : 'text-cli-gray-light border-b-2 border-transparent hover:text-cli-white'
                    }`}
                  onClick={() => setActiveTab('preview')}
                >
                  [ PREVIEW ]
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-bold transition-colors border-l border-cli-gray ${activeTab === 'editor'
                    ? 'text-cli-green border-b-2 border-cli-green bg-cli-green/5'
                    : 'text-cli-gray-light border-b-2 border-transparent hover:text-cli-white'
                    }`}
                  onClick={() => setActiveTab('editor')}
                >
                  [ EDITOR ]
                </button>
              </div>

              {/* Preview Pane */}
              <div
                className={`${activeTab === 'preview' ? 'flex' : 'hidden'
                  } md:flex flex-1 flex-col h-full border-r border-cli-gray bg-cli-black`}
              >
                <div className="bg-cli-gray-dark px-3 py-1 flex items-center border-b border-cli-gray text-xs text-cli-gray-light sticky top-0">
                  <span className="text-cli-white mr-2">pane:</span> README.md (Preview)
                </div>
                <ReadmePreview />
              </div>

              {/* Editor Pane */}
              <div
                className={`${activeTab === 'editor' ? 'flex' : 'hidden'
                  } md:flex flex-1 flex-col h-full bg-cli-black`}
              >
                <div className="bg-cli-gray-dark px-3 py-1 flex items-center border-b border-cli-gray text-xs text-cli-gray-light sticky top-0">
                  <span className="text-cli-white mr-2">pane:</span> README.md (Editor) <span className="text-cli-amber ml-2">[Modified]</span>
                </div>
                <EditorPanel />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
