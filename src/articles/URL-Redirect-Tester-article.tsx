import React, { useState } from 'react';

const URLRedirectTesterArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-rose-400">
                    <h2>The Difference Between 301 (Permanent) and 302 (Temporary) Redirects, and Their Impact on SEO Link Equity</h2>
                    <p>
                        In the worlds of web development and SEO, redirects are an essential tool for guiding users and search engines from one URL to another. They are used when content moves, a site structure changes, or when multiple domains need to consolidate. However, not all redirects are created equal. The two most common types, 301 and 302, send vastly different signals to search engines, and using the wrong one can have a significant negative impact on your website's search rankings. Understanding the distinction between a permanent (301) and a temporary (302) redirect is crucial for preserving your hard-earned SEO value.
                    </p>

                    <h3>301 Redirect: "This Content Has Moved Permanently"</h3>
                    <p>
                        A 301 redirect is a permanent redirect. When you implement a 301, you are telling search engines that a page has been moved to a new location for good and that they should update their index accordingly. This is the most common and powerful type of redirect for SEO purposes.
                    </p>
                    <p>
                        The primary benefit of a 301 redirect is its effect on **link equity** (also known as "link juice"). When one page links to another, it passes a certain amount of authority or value. A 301 redirect signals to search engines that they should pass the vast majority (historically 90-99%, now considered nearly 100%) of the original URL's link equity to the new destination URL. This means that the ranking power of the old page is effectively transferred to the new one, preventing a loss of SEO value.
                    </p>
                    <p>
                        <strong>Use a 301 redirect when:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                        <li>You are permanently moving a piece of content to a new URL.</li>
                        <li>You are migrating your entire website to a new domain.</li>
                        <li>You are changing your site structure (e.g., changing from `http` to `https`).</li>
                        <li>You are consolidating duplicate content to a single preferred version.</li>
                    </ul>

                    <h3>302 Redirect: "This Content Has Moved Temporarily"</h3>
                    <p>
                        A 302 redirect, on the other hand, is a temporary redirect. It tells search engines that a page has been moved to a new location, but only for a short time, and that the original URL should be kept in the index. Because the move is considered temporary, search engines historically did not pass link equity through a 302 redirect.
                    </p>
                    <p>
                        While Google has stated that it may sometimes treat a 302 like a 301 if it believes the redirect is permanent in practice, relying on this is risky. The official signal of a 302 is that the original URL is the one that matters and will be back soon. Using a 302 for a permanent move can confuse search engines, leading them to keep the old URL indexed and potentially splitting the link equity between the old and new URLs, diluting your ranking power.
                    </p>
                     <p>
                        <strong>Use a 302 redirect when:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                        <li>You are A/B testing a new page design and temporarily sending some users to an alternate version.</li>
                        <li>You need to redirect users to a different page while your site is undergoing maintenance.</li>
                        <li>You are running a short-term promotion and want to direct users from a clean URL to a specific landing page with tracking parameters.</li>
                    </ul>

                    <h3>Conclusion: Choose Wisely</h3>
                    <p>
                        The choice between a 301 and 302 redirect comes down to intent. If the change is permanent, always use a 301 to consolidate your SEO signals and pass link equity. If the change is temporary and you fully intend for the original URL to be the canonical one in the long run, a 302 is the appropriate choice. Using a redirect tester to audit your site can uncover incorrect redirect types, ensuring that you are sending the right signals to search engines and maximizing your SEO performance.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-rose-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default URLRedirectTesterArticle;