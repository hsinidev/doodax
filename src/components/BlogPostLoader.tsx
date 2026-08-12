import React, { Suspense, lazy } from 'react';
import { blogPosts } from '../data/blogPosts';

const BlogPostTemplate = lazy(() => import('./BlogPostTemplate'));

interface BlogPostLoaderProps {
    slug: string;
}

const BlogPostLoader: React.FC<BlogPostLoaderProps> = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <div className="text-center p-20 text-white text-xl">Article not found.</div>;
    }

    return (
        <Suspense fallback={<div className="text-center p-20 text-white">Loading Article...</div>}>
            <BlogPostTemplate post={post} />
        </Suspense>
    );
};

export default BlogPostLoader;
