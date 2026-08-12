import React, { useState } from 'react';

const RobotsTxtGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/60 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>The Rules of Robots.txt: How to Block Crawlers, Specify Sitemap Location, and Avoid Common Indexing Mistakes</h2>
                    <p>
                        The <code>robots.txt</code> file is a small but powerful text file that sits at the root of a website. Its primary purpose is to communicate with web crawlers and other web robots, providing instructions on which pages or files the crawler can or cannot request from your site. While it's a simple protocol, using it correctly is a fundamental aspect of technical SEO. A well-configured <code>robots.txt</code> file can prevent your site from being overloaded with requests, keep private sections of your site out of search results, and guide search engines to your sitemap. Conversely, a mistake in this file can have disastrous consequences, such as accidentally blocking your entire site from being indexed.
                    </p>

                    <h3>The Core Directives: User-agent, Disallow, and Allow</h3>
                    <p>
                        The <code>robots.txt</code> file is made up of groups of directives, each starting with a <code>User-agent</code> line. This specifies which crawler the rules apply to. You can have rules for all crawlers or target specific ones like Google's <code>Googlebot</code>.
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>User-agent:</strong> This directive identifies the specific robot the following rules apply to. For example, <code>User-agent: *</code> applies the rules to all crawlers. <code>User-agent: Googlebot</code> would apply them only to Google's main crawler.
                        </li>
                        <li>
                            <strong>Disallow:</strong> This is the most common directive. It tells a user-agent not to crawl a specific URL path. For example, <code>Disallow: /admin/</code> would prevent crawlers from accessing any URL that begins with `/admin/`. You can disallow single files, entire directories, or even the whole site (<code>Disallow: /</code>).
                        </li>
                         <li>
                            <strong>Allow:</strong> This directive explicitly permits a user-agent to crawl a subdirectory or page, even if its parent directory is disallowed. For example, if you've disallowed <code>/private/</code> but want to allow access to a specific file within it, you could use:
                            <pre><code>{`Disallow: /private/\nAllow: /private/public-file.html`}</code></pre>
                        </li>
                    </ul>

                    <h3>Specifying Your Sitemap: A Crucial Directive</h3>
                    <p>
                        One of the most valuable directives you can include in your <code>robots.txt</code> is the <code>Sitemap</code> directive. This tells compliant crawlers (like Google, Bing, and Yandex) the location of your XML sitemap. The sitemap is a file that lists all the important pages on your website that you want to be indexed.
                    </p>
                    <p>
                        Example: <code>Sitemap: https://www.example.com/sitemap.xml</code>
                    </p>
                    <p>
                        While you should also submit your sitemap directly to tools like Google Search Console, including it in your <code>robots.txt</code> file is a best practice. It serves as a clear and immediate pointer for any crawler that visits your site, helping them discover all of your content more efficiently.
                    </p>
                    
                    <h3>Common Mistakes to Avoid</h3>
                    <p>
                        Misconfiguring your <code>robots.txt</code> can lead to serious SEO issues. Here are some common pitfalls:
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Using it for Security:</strong> <code>robots.txt</code> is not a security mechanism. It is a set of guidelines that reputable crawlers will follow. Malicious bots will ignore it completely. Never use it to "protect" sensitive user information; that requires proper authentication and server-side security.
                        </li>
                        <li>
                            <strong>Blocking CSS and JavaScript Files:</strong> In the past, it was common to disallow crawling of CSS and JS files. This is now a major mistake. Modern search engines like Google render pages to understand their content and layout. Blocking these resources prevents them from rendering the page correctly, which can severely harm your rankings.
                        </li>
                        <li>
                            <strong>Accidental <code>Disallow: /</code>:</strong> A single, seemingly innocent slash in a disallow directive will block your entire website. Always double-check your syntax before deploying a new <code>robots.txt</code> file.
                        </li>
                         <li>
                            <strong>Case Sensitivity:</strong> Paths in the <code>robots.txt</code> file are case-sensitive. <code>Disallow: /Photo/</code> is different from <code>Disallow: /photo/</code>.
                        </li>
                    </ul>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-blue-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default RobotsTxtGeneratorArticle;