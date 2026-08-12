import React, { useState, useEffect, Suspense, lazy, type ReactNode, type ErrorInfo } from 'react';
import ThemeLayout from './components/ThemeLayout.tsx';
import ToolGrid from './components/ToolGrid.tsx';
import SeoArticle from './utils/SeoArticle.tsx';
import { Category, tools } from './src/utils/ToolDefinitions.ts';
import SearchResults from './components/SearchResults.tsx';

// Simple Error Boundary to catch errors from lazy loading if a file doesn't exist
interface ErrorBoundaryProps {
    fallback: ReactNode;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error) {
        console.error("Error loading component:", error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error boundary caught:", error, errorInfo);
    }

    // Reset the boundary on component change
    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        if (prevProps.children !== this.props.children) {
            this.setState({ hasError: false });
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

const ToolPage: React.FC<{ toolName: string }> = ({ toolName }) => {
    // Vite supports dynamic imports with variables if the path is sufficiently constrained.
    const ToolComponent = lazy(() => import(`./src/tools/${toolName}.tsx`));
    const ArticleComponent = lazy(() => import(`./src/articles/${toolName}-article.tsx`));

    return (
        <main className="container mx-auto px-4 py-8 md:py-16 space-y-12">
            <ErrorBoundary fallback={<div className="text-center p-8 bg-red-900/50 rounded-lg">Error: The requested tool component could not be loaded.</div>}>
                <Suspense fallback={<div className="text-center p-16 text-xl">Loading Tool...</div>}>
                    <ToolComponent />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                    <ArticleComponent />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};


const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        // Listen for both browser back/forward and our custom navigation events
        window.addEventListener("popstate", onLocationChange);
        return () => window.removeEventListener("popstate", onLocationChange);
    }, []);

    const pathParts = currentPath.split('/').filter(Boolean);
    const isToolPage = pathParts[0] === 'tool' && pathParts[1] && tools.some(t => t.fileName === pathParts[1]);

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
        if (e) e.preventDefault();
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    let content;
    if (isToolPage) {
        const toolName = pathParts[1];
        content = <ToolPage toolName={toolName} />;
    } else if (pathParts[0] === 'blog') {
        if (pathParts[1]) {
            // Individual Blog Post
            const slug = pathParts[1];
            const BlogPostLoader = lazy(() => import('./src/components/BlogPostLoader'));

            content = (
                <Suspense fallback={<div className="text-center p-20 text-white">Loading Article...</div>}>
                    <BlogPostLoader slug={slug} />
                </Suspense>
            );
        } else {
            // Blog Index
            const BlogIndex = lazy(() => import('./src/pages/BlogIndex'));
            content = (
                <Suspense fallback={<div className="text-center p-20 text-white">Loading Blog...</div>}>
                    <BlogIndex />
                </Suspense>
            );
        }
    } else {
        content = (
            <main className="container mx-auto px-4 py-8 md:py-16">
                <header className="text-center mb-16 md:mb-24 relative">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gray-800/80 border border-gray-700 text-cyan-400 text-sm font-semibold tracking-wide uppercase shadow-lg backdrop-blur-sm">
                        The Ultimate Developer Toolkit
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                        150+ Free, <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-glow-filter">
                            Powerful Online Tools
                        </span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Unlock your productivity with our comprehensive suite of utilities. <br className="hidden md:block" />
                        Designed for developers, creators, and professionals who build the future.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => document.getElementById('tool-grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3.5 rounded-full bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Explore Tools
                        </button>
                        <button
                            onClick={() => handleNav(null as any, '/blog')}
                            className="px-8 py-3.5 rounded-full bg-gray-800 text-white font-bold text-lg border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all transform hover:scale-105"
                        >
                            Read Guides
                        </button>
                    </div>

                    {/* Hero Search Bar */}
                    <div className="mt-12 max-w-2xl mx-auto relative z-20">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 blur"></div>
                            <div className="relative flex items-center bg-gray-900 rounded-full border border-gray-700 shadow-2xl overflow-hidden">
                                <div className="pl-6 text-gray-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for tools (e.g. 'speed test', 'pdf', 'converter')..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-white px-4 py-4 focus:outline-none text-lg placeholder-gray-500"
                                />
                            </div>

                            {/* Hero Search Results */}
                            {searchQuery && (
                                <div className="absolute top-full left-0 right-0 mt-4 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50 text-left">
                                    <SearchResults query={searchQuery} onResultClick={() => setSearchQuery('')} />
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div id="tool-grid">
                    <ToolGrid
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                    />
                </div>

                <div className="mt-20">
                    <SeoArticle />
                </div>
            </main>
        );
    }

    return (
        <ThemeLayout
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            currentToolName={isToolPage ? pathParts[1] : undefined}
        >
            {content}
        </ThemeLayout>
    );
};

export default App;