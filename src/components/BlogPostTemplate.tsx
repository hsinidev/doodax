import React from 'react';
import { BlogPost } from '../types/BlogPost';
import { tools } from '../utils/ToolDefinitions';

interface BlogPostTemplateProps {
    post: BlogPost;
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ post }) => {
    // Generate JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://doodax.com/blog/${post.slug}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "Doodax",
            "logo": {
                "@type": "ImageObject",
                "url": "https://doodax.com/favicon.svg"
            }
        }
    };

    // FAQ Schema
    if (post.faq && post.faq.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
        // Merge or add as separate script? Usually separate is fine or array.
        // For simplicity, we'll just render a second script tag for FAQ if present.
    }

    const relatedToolsData = post.relatedTools
        ? tools.filter(t => post.relatedTools?.includes(t.fileName))
        : [];

    return (
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {post.faq && post.faq.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": post.faq.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    })
                }} />
            )}

            <header className="mb-10 text-center">
                <div className="flex justify-center gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm uppercase tracking-wide border border-cyan-900/50">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="text-gray-400 flex items-center justify-center gap-4 text-sm">
                    <span>By <span className="text-gray-200">{post.author}</span></span>
                    <span>•</span>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
            </header>

            <div
                className="prose prose-lg prose-invert max-w-none 
                prose-headings:text-cyan-100 prose-headings:font-bold 
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-blockquote:border-l-cyan-500 prose-blockquote:bg-gray-800/50 prose-blockquote:py-2 prose-blockquote:px-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.faq && post.faq.length > 0 && (
                <section className="mt-16 border-t border-gray-800 pt-10">
                    <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {post.faq.map((item, index) => (
                            <div key={index} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-cyan-300 mb-3">{item.question}</h3>
                                <p className="text-gray-300">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {relatedToolsData.length > 0 && (
                <section className="mt-16 border-t border-gray-800 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedToolsData.map(tool => (
                            <a
                                key={tool.fileName}
                                href={`/tool/${tool.fileName}`}
                                className="flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-cyan-500/50 rounded-xl transition-all group"
                            >
                                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{tool.name}</h4>
                                    <p className="text-sm text-gray-400 line-clamp-1">{tool.role}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
};

export default BlogPostTemplate;
