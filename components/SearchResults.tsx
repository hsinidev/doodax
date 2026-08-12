import React, { useMemo } from 'react';
import { tools, Tool } from '../src/utils/ToolDefinitions';

interface SearchResultsProps {
    query: string;
    onResultClick: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onResultClick }) => {
    const filteredTools = useMemo(() => {
        if (!query) return [];
        const lowercasedQuery = query.toLowerCase();
        return tools
            .filter(tool =>
                tool.name.toLowerCase().includes(lowercasedQuery) ||
                tool.role.toLowerCase().includes(lowercasedQuery)
            )
            .slice(0, 7); // Limit results
    }, [query]);

    if (filteredTools.length === 0) {
        return (
            <div className="p-4 text-gray-400">No results found.</div>
        );
    }

    // Client-side navigation handler
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        onResultClick(); // Close the search dropdown
    };

    return (
        <ul className="space-y-1 p-2">
            {filteredTools.map(tool => (
                <li key={tool.fileName}>
                    <a
                        href={tool.isStatic ? `/tools/${tool.fileName}/index.html` : `/tool/${tool.fileName}`}
                        onClick={(e) => !tool.isStatic && handleNav(e, `/tool/${tool.fileName}`)}
                        className="w-full text-left flex items-center space-x-4 p-3 hover:bg-cyan-500/10 rounded-md transition-colors"
                    >
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                        <div>
                            <p className="font-semibold text-white">{tool.name}</p>
                            <p className="text-xs text-gray-400">{tool.category}</p>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
