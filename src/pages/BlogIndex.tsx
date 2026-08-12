import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/blogPosts';

const BlogIndex: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Client-side navigation handler
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        window.scrollTo(0, 0);
    };

    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
                    Doodax Blog
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Insights, tutorials, and guides to help you get the most out of our tools and boost your productivity.
                </p>
            </header>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                    <article key={post.id} className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group flex flex-col">
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{post.category}</span>
                                <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                <a href={`/blog/${post.slug}`} onClick={(e) => handleNav(e, `/blog/${post.slug}`)}>
                                    {post.title}
                                </a>
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                {post.excerpt}
                            </p>
                            <a
                                href={`/blog/${post.slug}`}
                                onClick={(e) => handleNav(e, `/blog/${post.slug}`)}
                                className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors mt-auto"
                            >
                                Read Article
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No articles found matching your search.</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-cyan-400 hover:underline">Clear filters</button>
                </div>
            )}
        </main>
    );
};

export default BlogIndex;
