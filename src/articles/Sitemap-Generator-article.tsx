import React, { useState } from 'react';

const SitemapGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 p-6 rounded-lg">
            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-60 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-teal-400">
                    <h2>The XML Sitemap Protocol: Best Practices for <code>&lt;lastmod&gt;</code>, <code>&lt;changefreq&gt;</code>, and Submitting Your Sitemap to Google Search Console</h2>
                    <p>
                        An XML sitemap is a file that lists the essential pages of your website, acting as a roadmap for search engines like Google to help them discover and index your content more intelligently. While search engines are sophisticated enough to find most pages by following links, a sitemap provides an explicit guide to all the content you deem important. This is especially crucial for large websites, sites with complex navigation, or new sites with few external links. Understanding the sitemap protocol and its best practices is a cornerstone of technical SEO, ensuring that your content doesn't get overlooked.
                    </p>

                    <h3>The Structure of an XML Sitemap: Mandatory and Optional Tags</h3>
                    <p>
                        A sitemap file must be encoded in UTF-8 and adhere to a specific XML schema. The basic structure is a <code>&lt;urlset&gt;</code> container that holds multiple <code>&lt;url&gt;</code> entries, one for each page you want to include.
                    </p>
                    <p>
                        Within each <code>&lt;url&gt;</code> entry, there is one mandatory tag and several optional ones:
                    </p>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong><code>&lt;loc&gt;</code> (Mandatory):</strong> This is the most critical tag. It contains the full, absolute URL of the page. The URL must be complete, including the protocol (e.g., <code>https://</code>).
                        </li>
                        <li>
                            <strong><code>&lt;lastmod&gt;</code> (Optional):</strong> This tag specifies the date the file was last modified, in <a href="https://www.w3.org/TR/NOTE-datetime" target="_blank" rel="noopener noreferrer">W3C Datetime</a> format (YYYY-MM-DD). Providing this information can help search engines understand if content has been updated and may encourage them to recrawl it. It's highly recommended to include this and keep it accurate.
                        </li>
                         <li>
                            <strong><code>&lt;changefreq&gt;</code> (Optional):</strong> This tag provides a hint to search engines about how frequently the page is likely to change. Valid values range from <code>always</code> and <code>hourly</code> to <code>daily</code>, <code>weekly</code>, <code>monthly</code>, <code>yearly</code>, and <code>never</code>. While you can set this, many SEO experts believe that search engines now rely more on the <code>&lt;lastmod&gt;</code> date and their own crawling algorithms to determine crawl frequency. A common best practice is to set it to a reasonable default like <code>daily</code> or <code>weekly</code>.
                        </li>
                         <li>
                            <strong><code>&lt;priority&gt;</code> (Optional):</strong> This tag hints at the importance of a particular URL relative to other URLs on your site. The value ranges from 0.0 to 1.0, with a default of 0.5. A higher value suggests a page is more important. However, Google has stated that they largely ignore this tag today, so its impact is minimal.
                        </li>
                    </ul>

                    <h3>Best Practices for Creating and Managing Your Sitemap</h3>
                    <p>
                        To get the most out of your sitemap, follow these best practices:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li><strong>Include Only Canonical URLs:</strong> Your sitemap should only list the final, canonical versions of your pages. Avoid including URLs that are redirected, blocked by <code>robots.txt</code>, or result in a 404 error.</li>
                        <li><strong>Keep it Updated:</strong> A static, outdated sitemap is of little use. Ensure your sitemap is automatically updated whenever you add, remove, or significantly change a page.</li>
                        <li><strong>Break Up Large Sitemaps:</strong> A single sitemap file is limited to 50,000 URLs and a file size of 50MB (uncompressed). If your site is larger, you can create multiple sitemap files and list them in a sitemap index file.</li>
                    </ol>
                    
                    <h3>Submitting Your Sitemap to Google Search Console</h3>
                    <p>
                        Once you've created your <code>sitemap.xml</code> file and uploaded it to the root directory of your website (e.g., <code>https://www.example.com/sitemap.xml</code>), the final step is to tell Google where to find it. The best way to do this is through Google Search Console.
                    </p>
                    <p>
                        Inside Search Console, navigate to the "Sitemaps" section in the left-hand menu. You'll see a field where you can "Add a new sitemap." Simply enter the URL of your sitemap file (e.g., <code>sitemap.xml</code>) and click "Submit." Google will then process the file and use it to inform its crawling schedule. The Search Console interface will provide valuable feedback, showing you how many of the submitted URLs have been indexed and highlighting any errors it encountered while processing the file. Regularly checking this report is a key part of maintaining a healthy SEO presence.
                    </p>
                
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-teal-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default SitemapGeneratorArticle;