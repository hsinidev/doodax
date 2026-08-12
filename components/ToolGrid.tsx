
import React from 'react';
import { tools } from '../src/utils/ToolDefinitions.ts';
import { Tool, Category } from '../src/utils/types.ts';

// Client-side navigation handler
const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Prevent a full page reload
    e.preventDefault();
    // Update the URL in the browser's address bar
    window.history.pushState({}, '', href);
    // Dispatch a 'popstate' event to notify the App component of the URL change
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
};

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
    const href = tool.isStatic ? `/tools/${tool.fileName}/index.html` : `/tool/${tool.fileName}`;

    return (
        <a
            href={href}
            id={tool.fileName}
            onClick={(e) => !tool.isStatic && handleNav(e, href)}
            className="block group p-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/80 rounded-xl hover:-translate-y-1 hover:bg-gray-700/70 hover:border-cyan-400/50 transition-all duration-300"
        >
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-700/80 rounded-lg group-hover:bg-cyan-600/80 transition-colors duration-300" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                <div>
                    <h3 className="text-md font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.role}</p>
                </div>
            </div>
        </a>
    );
};

interface ToolGridProps {
    searchQuery: string;
    selectedCategory: Category | 'All';
}

const ToolGrid: React.FC<ToolGridProps> = ({ searchQuery, selectedCategory }) => {

    const filteredTools = React.useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return tools.filter(tool => {
            const inCategory = selectedCategory === 'All' || tool.category === selectedCategory;
            if (!inCategory) return false;

            if (!lowercasedQuery) return true;

            return (
                tool.name.toLowerCase().includes(lowercasedQuery) ||
                tool.role.toLowerCase().includes(lowercasedQuery) ||
                tool.coreTechnology.toLowerCase().includes(lowercasedQuery)
            );
        });
    }, [searchQuery, selectedCategory]);

    const groupedTools = filteredTools.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {} as Record<Category, Tool[]>);

    const categoryOrder: Category[] = [
        'Web Dev',
        'AI & Content',
        'Image & Video',
        'Finance & Calculators',
        'Time & Date',
        'Reading & Writing',
        'Business & Productivity',
        'Legal & Public Services',
        'Utilities'
    ];

    if (filteredTools.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400">
                <h2 className="text-2xl font-bold text-white mb-2">No Tools Found</h2>
                <p>Try adjusting your search query or changing the selected category.</p>
            </div>
        );
    }

    return (
        <section className="space-y-12">
            {categoryOrder.map(category => {
                if (!groupedTools[category] || groupedTools[category].length === 0) return null;
                return (
                    <div key={category}>
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide border-l-4 border-cyan-500 pl-4 text-glow">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {groupedTools[category].map(tool => (
                                <ToolCard key={tool.fileName} tool={tool} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default ToolGrid;